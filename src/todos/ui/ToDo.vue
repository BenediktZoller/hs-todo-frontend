<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  text: string;
  modelValue: boolean;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  // delete: [];
}>();

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
    <!--    <button-->
    <!--      class="ml-auto bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"-->
    <!--      @click="emit('delete')"-->
    <!--    >-->
    <!--      <svg-->
    <!--        xmlns="http://www.w3.org/2000/svg"-->
    <!--        fill="none"-->
    <!--        viewBox="0 0 24 24"-->
    <!--        stroke="currentColor"-->
    <!--        class="h-5 w-5"-->
    <!--      >-->
    <!--        <path-->
    <!--          stroke-linecap="round"-->
    <!--          stroke-linejoin="round"-->
    <!--          stroke-width="2"-->
    <!--          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"-->
    <!--        />-->
    <!--      </svg>-->
    <!--    </button>-->
  </div>
</template>
