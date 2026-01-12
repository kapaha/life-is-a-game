<script setup>
import { ref } from 'vue';

const tasks = ref([]);
const taskName = ref('');

function handleTaskSubmit() {
    const newTask = {
        name: taskName.value,
        id: self.crypto.randomUUID()
    };

    tasks.value.push(newTask);

    taskName.value = '';
}
</script>

<template>
    <div
        class="container mx-auto my-8 max-w-125 space-y-4 border-4 border-zinc-900 bg-zinc-600 p-4"
    >
        <h1 class="text-center text-3xl">Tasks</h1>
        <div class="space-y-4" v-if="tasks.length">
            <div
                v-for="task in tasks"
                v-bind:key="task.id"
                class="flex items-center justify-between bg-zinc-500 p-2"
            >
                <p class="capitalize">{{ task.name }}</p>
            </div>
        </div>
        <form @submit.prevent="handleTaskSubmit" class="flex flex-col gap-2">
            <div class="flex flex-col gap-1">
                <label for="name">Task name</label>
                <input
                    v-model.trim="taskName"
                    id="name"
                    type="text"
                    class="bg-white px-2 py-1"
                />
            </div>
            <div class="flex gap-2">
                <button class="w-full bg-green-500 px-4 py-2" type="submit">
                    Add Task
                </button>
            </div>
        </form>
    </div>
</template>
