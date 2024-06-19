<script setup lang="ts">
import ToDoList from './components/ToDoList.vue';
</script>

<template>
  <div class="px-4 py-2">
    <h1 class="text-gray-800 font-bold text-2xl uppercase">To-Do List</h1>
  </div>
  <div
    class="block max-w-sm mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow"
  >
    <ToDoList />
  </div>
</template>
