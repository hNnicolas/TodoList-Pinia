<script setup lang="ts">
import { onUnmounted, ref } from 'vue';
import type { Todo } from './shared/interfaces/todo.interface';
import TodoForm from './components/TodoForm.vue';
import { useTodos, type TodoState } from './shared/stores/todoStore';
import type { Filter } from './shared/types';

const input = ref<string>('');

const todoStore = useTodos();

todoStore.fetchTodo();

function addTodo() {
    todoStore.addTodo(input.value);
    input.value = '';
}

function deleteTodo(todoId: string) {
    todoStore.deleteTodo(todoId);
}

function updateTodo(todoId: string, update: Partial<Todo>) {
    todoStore.updateTodo(todoId, update);
}

function updateFilter(event: Event) {
    const target = event.target as HTMLSelectElement;
    todoStore.updateFilter(target.value as Filter);
}

function deleteStore() {
    todoStore.$dispose();
}

function resetStore() {
    todoStore.$reset();
}

// todoStore.$subscribe((params) => {
//     console.log(params);
// })

// todoStore.$onAction((params) => {
    // console.log(params);
    // console.log('action is started');
    // after(() => {
    // console.log('action is done');
    // })
    // onError((error) => {
    // console.log('error')
    // })
// })



</script> 

<template>
    <div class="p-20 d-flex flex-row justify-content-center">
        <div class="container card">
            <div class="d-flex flex-row align-items-center mb-20">
                <h1 class="flex-fill">Todo list</h1>
                <select :value="todoStore.filter" @change="updateFilter($event)">
                    <option value="all">all</option>
                    <option value="done">Fini</option>
                    <option value="ongoing">En cours</option>
                </select>
            </div>
            <div class="d-flex flex-row align-items-center">
                <input v-model="input" type="text" class="flex-fill mr-20" />
                <button class="btn btn-primary mr-20" @click="addTodo">Ajouter</button>
            </div>
            <ul class="d-flex flex-column">
                <li
                    v-for="(todo, index) in todoStore.filteredTodoList"
                    :key="todo.content"
                    class="card"
                >
                    <div
                        class="d-flex flex-row align-items-center"
                        v-if="!todo.editMode"
                        @click="updateTodo(todo._id!, { done: !todo.done })"
                    >
                        <span class="flex-fill mr-20">{{ todo.content }}</span>
                        <input class="mr-20" type="checkbox" :checked="todo.done" />
                        <button
                            @click.stop="updateTodo(todo._id!, { editMode: true })"
                            class="btn btn-primary mr-20"
                        >Editer</button>
                        <button @click.stop="deleteTodo(todo._id!)" class="btn btn-danger">Supprimer</button>
                    </div>
                    <div v-else class="d-flex flex-row align-items-center">
                        <TodoForm
                            :content="todo.content"
                            @cancel="updateTodo(todo._id!, { editMode: false })"
                            @update="updateTodo(todo._id!, { editMode: false, content: $event })"
                        />
                    </div>
                </li>
            </ul>

            <!-- <button class="btn btn-danger" @click="deleteStore">dispose</button> -->
            <!-- <button class="btn btn-primary" @click="resetStore">reset</button> -->
        </div>
    </div>
</template>


<style lang="scss" >
@import "./assets/base.scss";

.container {
    width: 500px;
}
li {
    margin-bottom: 10px;
}
</style>