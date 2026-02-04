<script setup>
import { ref } from 'vue';
import { useGameState } from '@/composables/useGameState';

const { tasks, addTask, completeTask } = useGameState();

const taskName = ref('');

function handleSubmit() {
    if (!taskName.value) return;

    addTask(taskName.value);
    taskName.value = '';
}
</script>

<template>
    <div
        class="container mx-auto my-8 max-w-125 space-y-4 border-4 border-zinc-900 bg-zinc-600 p-4 text-white"
    >
        <h2 class="text-center text-3xl">Tasks</h2>
        <div class="space-y-4" v-if="tasks.length">
            <div
                v-for="task in tasks"
                :key="task.id"
                class="flex items-center justify-between bg-zinc-500 p-2 transition-opacity"
                :class="{
                    'pointer-events-none opacity-50': task.isComplete
                }"
            >
                <p class="capitalize">{{ task.name }}</p>

                <button
                    class="bg-green-500 px-4 py-2 leading-none"
                    @click="completeTask(task.id)"
                >
                    Complete
                </button>
            </div>
        </div>
        <form @submit.prevent="handleSubmit" class="flex flex-col gap-2">
            <div class="flex flex-col gap-1">
                <label for="name">Task name</label>
                <input
                    v-model.trim="taskName"
                    id="name"
                    type="text"
                    class="bg-white px-2 py-1 text-black"
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
