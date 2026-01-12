<script setup>
import GameComp from './components/GameComp.vue';
</script>

<template>
    <div class="flex min-h-dvh flex-col">
        <header class="bg-zinc-900 px-8 py-4">Life is a Game</header>
        <main class="flex-1 px-4">
            <GameComp />
        </main>
        <footer class="bg-zinc-900 px-8 py-4">Footer</footer>
    </div>
</template>

<style scoped></style>
