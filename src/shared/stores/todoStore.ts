
import type { Todo } from "@/shared/interfaces/todo.interface";
import { defineStore } from "pinia";
import { addTodo, deleteTodo, fetchTodo, updateTodo } from "../services/todo.service";
import type { Filter } from "../types";

export interface TodoState {
    todos: Todo[],
    filter: Filter
}

export const useTodos = defineStore('todos', {
    state: (): TodoState => ({
        todos: [],
        filter: 'all'
    }),
    getters: {
        todoList(state: TodoState): Todo[] {
            return state.todos
        },
        filteredTodoList(state: TodoState): Todo[] {
            if (state.filter === 'all') {
                return this.todoList
            } else if (state.filter === 'done') {
                return this.todoList.filter(t => t.done);
            } else {
                return this.todoList.filter(t => !t.done);
            }
        }
    },
    actions: {
        updateFilter(filter: Filter) {
            this.filter = filter
        },
        async fetchTodo() {
            const todos = await fetchTodo();
            if (Array.isArray(todos)) {
                this.todos = todos;
            } else {
                this.todos = [todos];
            }
        },
        async addTodo(content: string) {
            const newTodo = await addTodo({
                content,
                done: false,
                editMode: false
            })
            this.todos.push(newTodo);
        },
        async deleteTodo(todoId: string) {
            await deleteTodo(todoId);
            const index = this.todos.findIndex(t => t._id === todoId);
            this.todos.splice(index, 1);
        },
        async updateTodo(todoId: string, update: Partial<Todo>) {
            const todoIndex = this.todos.findIndex(t => t._id === todoId)
            const updatedTodo = await updateTodo(todoId, {
                ...this.todos[todoIndex],
                ...update
            } as Todo);
            this.todos[todoIndex] = updatedTodo;
        }
    }
})