<script setup>
import CharacterPanel from './CharacterPanel.vue';
import TaskPanel from './TaskPanel.vue';
import DebugPanel from './DebugPanel.vue';

const isDev = import.meta.env.DEV;
</script>

<template>
    <header class="bg-zinc-900 px-8 py-4 text-white">
        <h1>Life is a Game</h1>
    </header>

    <main class="flex-1 px-4">
        <CharacterPanel />
        <TaskPanel />
    </main>

    <DebugPanel v-if="isDev" />

    <footer class="bg-zinc-900 px-8 py-4 text-transparent">Footer</footer>
</template>
