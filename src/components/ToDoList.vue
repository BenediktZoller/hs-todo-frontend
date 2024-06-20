<script setup lang="ts">
import { ref } from 'vue';
import ToDo from './ToDo.vue';
import hsKempten from '../assets/hs-kempten.svg';

const todos = ref<Array<{ text: string; done: boolean }>>([]);
todos.value.push({ text: 'Learn Vue 3', done: false });
todos.value.push({ text: 'Forget React', done: false });
todos.value.push({ text: 'Learn Tailwind', done: false });
todos.value.push({ text: 'Learn Vitest', done: false });
todos.value.push({ text: 'Learn Nestjs', done: false });
todos.value.push({ text: 'Learn Supertest', done: false });
todos.value.push({ text: 'Learn TypeORM', done: false });

const newTodo = ref<string>('');

function addTodo() {
  todos.value.push({ text: newTodo.value, done: false });
  newTodo.value = '';
}
</script>

<template>
  <div class="relative grid gap-6 pb-6 grid-cols-1">
    <input
      v-model="newTodo"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      type="text"
      placeholder="Add a task"
    />
    <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
      type="button"
      @click="addTodo"
    >
      Add
    </button>
    <ToDo
      v-for="todo in todos"
      :key="todo.text"
      :text="todo.text"
      :model-value="todo.done"
    />
    <img
      :src="hsKempten"
      alt="hs-kempten-logo"
      class="w-20 h-20 absolute -bottom-6 right-0"
    />
  </div>
</template>
