import App from '../src/App.vue';
import { render, screen } from '@testing-library/vue';
import { describe, it, expect } from 'vitest';
import { userEvent } from '@testing-library/user-event';

describe('App', () => {
  it('should render the to-do list', async () => {
    render(App);
    screen.getByText('To-Do List');
    screen.getByPlaceholderText('Add a task');
    screen.getByLabelText('Learn Vue 3');
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
    render(App);
    const user = userEvent.setup();
    const input = screen.getByPlaceholderText('Add a task');
    const button = screen.getByRole('button', { name: 'Add' });
    await user.click(input);
    await user.type(input, 'New Task');
    await user.click(button);
    screen.getByText('New Task');
    expect(screen.getByPlaceholderText('Add a task')).toHaveValue('');
  });
});
