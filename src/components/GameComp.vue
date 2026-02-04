<script setup>
import { ref, computed, watch } from 'vue';

const STORAGE_KEY = 'life-is-a-game';

let saved = null;
try {
    saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
} catch {
    // ignore corrupt data
}

const tasks = ref(saved?.tasks ?? []);
const taskName = ref('');

const totalXp = ref(saved?.totalXp ?? 0);
const currentLevel = ref(saved?.currentLevel ?? 1);

watch(
    [tasks, totalXp, currentLevel],
    () => {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({
                tasks: tasks.value,
                totalXp: totalXp.value,
                currentLevel: currentLevel.value
            })
        );
    },
    { deep: true }
);

const currentLevelXp = computed({
    get() {
        return totalXp.value % 100;
    }
});

const showLevelUp = ref(false);
let levelUpTimeout = null;

watch(currentLevel, () => {
    clearTimeout(levelUpTimeout);
    showLevelUp.value = true;
    levelUpTimeout = setTimeout(() => {
        showLevelUp.value = false;
    }, 1500);
});

function handleTaskSubmit() {
    const newTask = {
        id: self.crypto.randomUUID(),
        name: taskName.value,
        isComplete: false
    };

    tasks.value.push(newTask);

    taskName.value = '';
}

function handleTaskComplete(id) {
    tasks.value = tasks.value.map((task) => {
        if (task.id === id && !task.isComplete) {
            totalXp.value += 10;

            if (totalXp.value >= currentLevel.value * 100) {
                currentLevel.value += 1;
            }

            return { ...task, isComplete: true };
        }

        return task;
    });
}
</script>

<template>
    <header class="bg-zinc-900 px-8 py-4 text-white">
        <h1>Life is a Game</h1>
    </header>
    <main class="flex-1 px-4">
        <div
            class="container mx-auto my-8 max-w-125 space-y-4 border-4 border-zinc-900 bg-zinc-600 p-4 text-white"
        >
            <h2 class="text-center text-3xl">Character</h2>
            <p class="text-center">Level {{ currentLevel }}</p>
            <p v-if="showLevelUp" class="text-center text-sm text-green-400">
                Level up!
            </p>
            <p class="text-center">{{ currentLevelXp }} / 100 XP</p>
            <div class="h-4 w-full border-2 border-zinc-900 bg-zinc-800">
                <div
                    class="h-full bg-green-500"
                    :style="{ width: currentLevelXp + '%' }"
                ></div>
            </div>
        </div>
        <div
            class="container mx-auto my-8 max-w-125 space-y-4 border-4 border-zinc-900 bg-zinc-600 p-4 text-white"
        >
            <h2 class="text-center text-3xl">Tasks</h2>
            <div class="space-y-4" v-if="tasks.length">
                <div
                    v-for="task in tasks"
                    v-bind:key="task.id"
                    class="flex items-center justify-between bg-zinc-500 p-2 transition-opacity"
                    :class="{
                        'pointer-events-none opacity-50': task.isComplete
                    }"
                >
                    <p class="capitalize">{{ task.name }}</p>

                    <button
                        class="bg-green-500 px-4 py-2 leading-none"
                        @click="handleTaskComplete(task.id)"
                    >
                        Complete
                    </button>
                </div>
            </div>
            <form
                @submit.prevent="handleTaskSubmit"
                class="flex flex-col gap-2"
            >
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
    </main>
    <footer class="bg-zinc-900 px-8 py-4 text-transparent">Footer</footer>
</template>
