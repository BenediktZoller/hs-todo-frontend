<script setup lang="ts">
import { ref } from 'vue';
import ToDo from './ToDo.vue';
import hsKempten from '../../assets/hs-kempten.svg';
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import { getToDos, patchTodo, postToDo } from '../api/ToDoApi';

const todos = ref<Array<{ title: string; completed: boolean; id: string }>>([]);
todos.value.push({ title: 'Learn Vue 3', completed: false, id: '1' });
todos.value.push({ title: 'Forget React', completed: false, id: '2' });
todos.value.push({ title: 'Learn Tailwind', completed: false, id: '3' });
todos.value.push({ title: 'Learn Vitest', completed: false, id: '4' });
todos.value.push({ title: 'Learn Nestjs', completed: false, id: '5' });
todos.value.push({ title: 'Learn Supertest', completed: false, id: '6' });
todos.value.push({ title: 'Learn TypeORM', completed: false, id: '7' });

const queryClient = useQueryClient();

const { isPending, isError, error } = useQuery({
  queryKey: ['todos'],
  queryFn: getToDos,
});

const postMutation = useMutation({
  mutationFn: postToDo,
  onSuccess: async () => {
    await queryClient.invalidateQueries({ queryKey: ['todos'] });
  },
});

const updateMutation = useMutation({
  mutationFn: patchTodo,
  onSuccess: async () => {
    await queryClient.invalidateQueries({ queryKey: ['todos'] });
  },
});

const newTodo = ref<string>('');

function addTodo() {
  todos.value.push({
    title: newTodo.value,
    completed: false,
    id: Math.random().toString(),
  });
  postMutation.mutate({ title: newTodo.value, completed: false });
  newTodo.value = '';
}

function update(id: string, completed: boolean) {
  updateMutation.mutate({ id, completed });
}
</script>

<template>
  <div class="relative grid gap-6 pb-12 grid-cols-1">
    <span v-if="isPending">Loading...</span>
    <span v-else-if="isError">{{ error }}</span>
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
      :key="todo.id"
      :text="todo.title"
      :model-value="todo.completed"
      @update:model-value="(value) => update(todo.id, value)"
    />
    <img
      :src="hsKempten"
      alt="hs-kempten-logo"
      class="w-20 h-20 absolute -bottom-6 right-0"
    />
  </div>
</template>
