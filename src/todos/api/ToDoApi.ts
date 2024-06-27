import apiClient from '../../api/client';

export async function getToDos(): Promise<ToDoDto[]> {
  const result = await apiClient.get<ToDoDto[]>('/tasks');
  return result.data;
}

export function postToDo(todo: Omit<ToDoDto, 'id'>) {
  return apiClient.post('/tasks', todo);
}

export function deleteTodo(id: string) {
  return apiClient.delete(`/tasks/${id}`);
}

export function patchTodo(todo: Partial<ToDoDto>) {
  return apiClient.patch(`/tasks/${todo.id}`, { completed: todo.completed });
}

export type ToDoDto = {
  id: string;
  title: string;
  completed: boolean;
};
