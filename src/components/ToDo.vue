<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  text: string;
  modelValue: boolean;
}>();

const emit = defineEmits(['update:modelValue']);

const checkboxValue = computed({
  get: () => props.modelValue,
  set: (newValue) => emit('update:modelValue', newValue),
});
</script>

<template>
  <div class="flex items-center mb-4">
    <input
      :id="props.text"
      v-model="checkboxValue"
      type="checkbox"
      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
    />
    <label
      :for="props.text"
      class="ms-2 text-md font-medium text-gray-900"
      >{{ props.text }}</label
    >
  </div>
</template>
