<script setup lang="ts">
import { computed, ref } from 'vue';
import { Pencil, Trash2 } from '@lucide/vue';
import FancyCard from '@/components/FancyCard.vue';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ApiError } from '@/api/client';
import { listUsers, createUser, updateUser, deleteUser as apiDeleteUser } from '@/api/users';
import { RESEARCHER_DEFAULT_PERMISSIONS } from '@rtidb/shared/authorization';
import type { UserRole, Permission } from '@rtidb/shared/permissions';

const emit = defineEmits<{
  unauthorized: [];
}>();

const usersList = ref<Array<{ id: number; username: string; role: UserRole; permissions: Permission[] }>>([]);
const showUserForm = ref(false);
const editingUserId = ref<number | null>(null);
const userFormError = ref('');
const userForm = ref<{ username: string; password: string; role: UserRole; permissions: Permission[] }>({
  username: '',
  password: '',
  role: 'editor',
  permissions: [],
});

function handleUnauthorized(err: unknown): boolean {
  if (err instanceof ApiError && err.status === 401) {
    emit('unauthorized');
    return true;
  }
  return false;
}

function togglePermission(perm: Permission, enabled: boolean) {
  const next = userForm.value.permissions.filter((p) => p !== perm);
  if (enabled) next.push(perm);
  userForm.value.permissions = next;
}

const permUploadRti = computed({
  get: () => userForm.value.permissions.includes('upload_rti'),
  set: (v: boolean) => togglePermission('upload_rti', v),
});
const permEditRecord = computed({
  get: () => userForm.value.permissions.includes('edit_record'),
  set: (v: boolean) => togglePermission('edit_record', v),
});
const permDeleteRecord = computed({
  get: () => userForm.value.permissions.includes('delete_record'),
  set: (v: boolean) => togglePermission('delete_record', v),
});

async function fetchUsers() {
  try {
    usersList.value = await listUsers();
  } catch (err) {
    if (handleUnauthorized(err)) return;
    console.error('Failed to load users', err);
  }
}

function openAddUser() {
  editingUserId.value = null;
  userForm.value = { username: '', password: '', role: 'editor', permissions: [] };
  userFormError.value = '';
  showUserForm.value = true;
}

function editUser(u: { id: number; username: string; role: UserRole; permissions: Permission[] }) {
  editingUserId.value = u.id;
  userForm.value = {
    username: u.username,
    password: '',
    role: u.role,
    permissions: [...u.permissions],
  };
  userFormError.value = '';
  showUserForm.value = true;
}

function closeUserForm() {
  showUserForm.value = false;
  editingUserId.value = null;
  userFormError.value = '';
}

async function saveUser() {
  userFormError.value = '';
  try {
    const body = {
      username: userForm.value.username,
      password: userForm.value.password,
      role: userForm.value.role,
      permissions:
        userForm.value.role === 'editor'
          ? userForm.value.permissions
          : userForm.value.role === 'researcher'
            ? RESEARCHER_DEFAULT_PERMISSIONS
            : [],
    };

    if (editingUserId.value) {
      await updateUser(editingUserId.value, body);
    } else {
      await createUser(body);
    }

    await fetchUsers();
    closeUserForm();
  } catch (err) {
    if (handleUnauthorized(err)) return;
    userFormError.value = err instanceof ApiError ? err.body : 'Network error. Please try again.';
  }
}

async function deleteUser(u: { id: number; username: string }) {
  if (!window.confirm(`Delete user "${u.username}"? This action cannot be undone.`)) return;
  try {
    await apiDeleteUser(u.id);
    usersList.value = usersList.value.filter((x) => x.id !== u.id);
  } catch (err) {
    if (handleUnauthorized(err)) return;
    alert(err instanceof ApiError ? `Failed to delete user: ${err.body}` : 'Failed to delete user.');
    console.error('Failed to delete user', err);
  }
}

defineExpose({ fetchUsers });
</script>

<template>
  <FancyCard class="text-left">
    <CardHeader class="flex flex-row items-center justify-between">
      <div>
        <CardTitle>User Accounts</CardTitle>
        <CardDescription>Create and manage access credentials and permission roles.</CardDescription>
      </div>
      <Button @click="openAddUser">Add User</Button>
    </CardHeader>
    <CardContent class="space-y-6">
      <div v-if="showUserForm" class="surface-panel p-6 space-y-4">
        <h3 class="text-lg font-bold">
          {{ editingUserId ? 'Edit User Credentials' : 'Create New User Account' }}
        </h3>
        <form @submit.prevent="saveUser" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-2">
              <Label>Username</Label>
              <Input v-model="userForm.username" required placeholder="e.g. johndoe" />
            </div>
            <div class="space-y-2">
              <Label>Password {{ editingUserId ? '(leave blank to keep current)' : '' }}</Label>
              <Input v-model="userForm.password" type="password" :required="!editingUserId" placeholder="••••••••" />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-2">
              <Label>Role</Label>
              <Select v-model="userForm.role">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="editor">Editor (Custom Permissions)</SelectItem>
                  <SelectItem value="researcher">Researcher (Private notes &amp; collaboration)</SelectItem>
                  <SelectItem value="admin">Administrator (All Permissions)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div v-if="userForm.role === 'editor'" class="space-y-2">
              <Label>Granted Permissions</Label>
              <div class="space-y-2">
                <label class="flex items-center gap-2 text-sm cursor-pointer">
                  <Checkbox v-model="permUploadRti" />
                  <span>Upload RTI scans & rerun failed jobs</span>
                </label>
                <label class="flex items-center gap-2 text-sm cursor-pointer">
                  <Checkbox v-model="permEditRecord" />
                  <span>Edit records details / publish status</span>
                </label>
                <label class="flex items-center gap-2 text-sm cursor-pointer">
                  <Checkbox v-model="permDeleteRecord" />
                  <span>Delete records</span>
                </label>
              </div>
            </div>

            <div v-else-if="userForm.role === 'researcher'" class="space-y-2">
              <Label>Researcher access</Label>
              <p class="text-xs text-muted-foreground leading-relaxed">
                Can sign in to add private notes, annotations, and scholarly comments on catalog records. No upload or admin access.
              </p>
            </div>
          </div>

          <Alert v-if="userFormError" variant="destructive">
            <AlertDescription>{{ userFormError }}</AlertDescription>
          </Alert>

          <div class="flex gap-2 justify-end">
            <Button type="submit">{{ editingUserId ? 'Save Changes' : 'Create User' }}</Button>
            <Button type="button" variant="outline" @click="closeUserForm">Cancel</Button>
          </div>
        </form>
      </div>

      <div class="rounded-xl border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Username</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Permissions</TableHead>
              <TableHead class="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="u in usersList" :key="u.id">
              <TableCell class="font-semibold">{{ u.username }}</TableCell>
              <TableCell>
                <Badge :variant="u.role === 'admin' ? 'default' : u.role === 'researcher' ? 'outline' : 'secondary'">{{ u.role }}</Badge>
              </TableCell>
              <TableCell>
                <span v-if="u.role === 'admin'" class="text-xs text-muted-foreground">All permissions</span>
                <span v-else-if="u.role === 'researcher'" class="text-xs text-muted-foreground">Private notes &amp; collaboration</span>
                <span v-else-if="u.permissions.length === 0" class="text-xs text-muted-foreground">None (read-only)</span>
                <div v-else class="flex flex-wrap gap-1">
                  <Badge v-for="p in u.permissions" :key="p" variant="outline" class="text-xs">{{ p }}</Badge>
                </div>
              </TableCell>
              <TableCell class="text-right">
                <div class="flex gap-1 justify-end">
                  <Button variant="ghost" size="icon" @click="editUser(u)" title="Edit User">
                    <Pencil class="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" class="text-destructive hover:text-destructive" @click="deleteUser(u)" title="Delete User">
                    <Trash2 class="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </CardContent>
  </FancyCard>
</template>
