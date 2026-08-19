<script setup lang="ts">
import type { DateValue } from '@internationalized/date'
import { CalendarDate, parseDate } from '@internationalized/date'
import { CalendarIcon } from '@lucide/vue'
import { computed } from 'vue'
import { dateToIso, formatCatalogDate } from '@rtidb/shared'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

const model = defineModel<string>({ default: '' })

const props = defineProps<{
  disabled?: boolean
  placeholder?: string
  class?: string
}>()

function toDateValue(value: string): DateValue | undefined {
  const iso = dateToIso(value)
  if (!iso) return undefined
  try {
    return parseDate(iso)
  } catch {
    return undefined
  }
}

const selected = computed<DateValue | undefined>({
  get: () => toDateValue(model.value),
  set: (value) => {
    if (!value) {
      model.value = ''
      return
    }
    const date = value as CalendarDate
    model.value = formatCatalogDate(date.toString())
  },
})

const label = computed(() => {
  if (!model.value) return props.placeholder || 'Pick a date'
  return formatCatalogDate(model.value)
})
</script>

<template>
  <Popover v-slot="{ close }">
    <PopoverTrigger as-child>
      <Button
        type="button"
        variant="outline"
        :disabled="disabled"
        :class="cn('w-full justify-start text-left font-normal', !model && 'text-muted-foreground', props.class)"
      >
        <CalendarIcon class="size-4" />
        {{ label }}
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0 z-[1100]" align="start">
      <Calendar
        :model-value="selected"
        layout="month-and-year"
        @update:model-value="(value) => { selected = Array.isArray(value) ? value[0] : value; close() }"
      />
    </PopoverContent>
  </Popover>
</template>
