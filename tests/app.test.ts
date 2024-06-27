import App from '../src/App.vue';
import { render, screen } from '@testing-library/vue';
import { describe, it, expect } from 'vitest';
import { userEvent } from '@testing-library/user-event';
import MockAdapter from 'axios-mock-adapter';
import apiClient from '../src/api/client';

describe('App', () => {
  let axiosMockAdapter: MockAdapter;

  beforeEach(() => {
    axiosMockAdapter = new MockAdapter(apiClient);
  });

  it('should render the to-do list', async () => {
    axiosMockAdapter
      .onGet('/tasks')
      .reply(200, [{ id: 1, title: 'Learn Vue 3', completed: false }]);
    render(App);
    screen.getByText('To-Do List');
    screen.getByPlaceholderText('Add a task');
    await screen.findByLabelText('Learn Vue 3');
  });

  it('should check a task if clicked', async () => {
    render(App);
    const user = userEvent.setup();
    const checkbox = screen.getByRole('checkbox', { name: 'Learn Vue 3' });
    expect(checkbox).not.toBeChecked();
    await user.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it('should add a task to the list', async () => {
    axiosMockAdapter
      .onGet('/tasks')
      .reply(200, [{ id: 1, title: 'Learn Vue 3', completed: false }]);
    axiosMockAdapter
      .onPost('/tasks')
      .reply(200, [{ id: 2, title: 'New Task', completed: false }]);
    render(App);
    await screen.findByLabelText('Learn Vue 3');
    axiosMockAdapter.onGet('/tasks').reply(200, [
      { id: 1, title: 'Learn Vue 3', completed: false },
      { id: 2, title: 'New Task', completed: false },
    ]);
    const user = userEvent.setup();
    const input = screen.getByPlaceholderText('Add a task');
    const button = screen.getByRole('button', { name: 'Add' });
    await user.click(input);
    await user.type(input, 'New Task');
    await user.click(button);
    await screen.findByLabelText('New Task');
    expect(screen.getByPlaceholderText('Add a task')).toHaveValue('');
  });

  afterEach(() => {
    axiosMockAdapter.reset();
  });
});
