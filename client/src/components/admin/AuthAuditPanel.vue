<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { AUTH_EVENT_TYPES, formatRecordDateTime, type AuthEventType } from '@rtidb/shared';
import FancyCard from '@/components/FancyCard.vue';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ApiError } from '@/api/client';
import { listAuthEvents } from '@/api/authEvents';
import type { AuthEventRow } from '@rtidb/shared/api/authEvents';

const emit = defineEmits<{
  unauthorized: [];
}>();

const EVENT_LABELS: Record<AuthEventType, string> = {
  login: 'Signed in',
  login_failed: 'Failed sign-in',
  logout: 'Signed out',
  session_sync: 'API session',
};

const PAGE_SIZE = 20;
const usernameFilter = ref('');
const eventFilter = ref<AuthEventType | 'all'>('all');
const page = ref(1);
const total = ref(0);
const totalPages = ref(1);
const loading = ref(false);
const events = ref<AuthEventRow[]>([]);

function handleUnauthorized(err: unknown): boolean {
  if (err instanceof ApiError && err.status === 401) {
    emit('unauthorized');
    return true;
  }
  return false;
}

function eventBadgeVariant(event: AuthEventType) {
  if (event === 'login_failed') return 'destructive' as const;
  if (event === 'login') return 'default' as const;
  return 'secondary' as const;
}

async function fetchEvents() {
  loading.value = true;
  try {
    const data = await listAuthEvents({
      page: page.value,
      limit: PAGE_SIZE,
      event: eventFilter.value === 'all' ? '' : eventFilter.value,
      username: usernameFilter.value,
    });
    events.value = data.results;
    total.value = data.total;
    totalPages.value = data.totalPages;
    page.value = data.page;
  } catch (err) {
    if (handleUnauthorized(err)) return;
    console.error('Failed to load auth events', err);
  } finally {
    loading.value = false;
  }
}

watch(eventFilter, () => {
  page.value = 1;
  fetchEvents();
});

function applyUsernameFilter() {
  page.value = 1;
  fetchEvents();
}

onMounted(fetchEvents);
</script>

<template>
  <FancyCard class="text-left">
    <CardHeader>
      <CardTitle>Login audit</CardTitle>
      <CardDescription>
        Who signed in, failed, or signed out. Entries older than 90 days are removed automatically.
      </CardDescription>
    </CardHeader>
    <CardContent class="space-y-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 items-end">
        <div class="space-y-2">
          <Label>Username</Label>
          <div class="flex gap-2">
            <Input
              v-model="usernameFilter"
              placeholder="Filter by username"
              @keyup.enter="applyUsernameFilter"
            />
            <Button type="button" variant="outline" @click="applyUsernameFilter">Filter</Button>
          </div>
        </div>
        <div class="space-y-2">
          <Label>Event</Label>
          <Select v-model="eventFilter">
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All events</SelectItem>
              <SelectItem v-for="type in AUTH_EVENT_TYPES" :key="type" :value="type">
                {{ EVENT_LABELS[type] }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <p v-if="!loading && events.length === 0" class="text-sm text-muted-foreground">
        No matching events yet.
      </p>

      <ul class="md:hidden rounded-xl border divide-y divide-slate-200 dark:divide-white/10 overflow-hidden">
        <li v-for="row in events" :key="`m-${row.id}`" class="p-3 space-y-1 bg-white dark:bg-slate-950/40">
          <div class="flex items-start justify-between gap-2">
            <div class="font-semibold wrap-anywhere">{{ row.username || '—' }}</div>
            <Badge :variant="eventBadgeVariant(row.event)">{{ EVENT_LABELS[row.event] }}</Badge>
          </div>
          <p class="text-xs font-mono text-muted-foreground">{{ formatRecordDateTime(row.createdAt) }}</p>
          <p class="text-xs text-muted-foreground wrap-anywhere">{{ row.ip || '—' }}</p>
        </li>
      </ul>

      <div class="relative hidden md:block rounded-xl border overflow-hidden">
        <Table class="min-w-[40rem]">
          <TableHeader>
            <TableRow>
              <TableHead>When</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Event</TableHead>
              <TableHead>IP</TableHead>
              <TableHead>Client</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="row in events" :key="row.id">
              <TableCell class="whitespace-nowrap font-mono text-xs">{{ formatRecordDateTime(row.createdAt) }}</TableCell>
              <TableCell class="font-semibold">{{ row.username || '—' }}</TableCell>
              <TableCell>
                <Badge :variant="eventBadgeVariant(row.event)">{{ EVENT_LABELS[row.event] }}</Badge>
              </TableCell>
              <TableCell class="font-mono text-xs">{{ row.ip || '—' }}</TableCell>
              <TableCell class="text-xs text-muted-foreground max-w-[18rem] truncate" :title="row.userAgent || ''">
                {{ row.userAgent || '—' }}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div v-if="totalPages > 1" class="flex items-center justify-between gap-2">
        <p class="text-xs text-muted-foreground">{{ total }} events</p>
        <div class="flex gap-2">
          <Button variant="outline" size="sm" :disabled="page <= 1" @click="page -= 1; fetchEvents()">Previous</Button>
          <Button variant="outline" size="sm" :disabled="page >= totalPages" @click="page += 1; fetchEvents()">Next</Button>
        </div>
      </div>
    </CardContent>
  </FancyCard>
</template>
