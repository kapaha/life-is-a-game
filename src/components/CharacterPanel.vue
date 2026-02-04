<script setup>
import { ref, watch } from 'vue';
import { useGameState } from '@/composables/useGameState';

const { currentLevel, currentLevelXp, XP_PER_LEVEL } = useGameState();

const showLevelUp = ref(false);
let levelUpTimeout = null;

watch(currentLevel, () => {
    clearTimeout(levelUpTimeout);

    showLevelUp.value = true;

    levelUpTimeout = setTimeout(() => {
        showLevelUp.value = false;
    }, 1500);
});
</script>

<template>
    <div
        class="container mx-auto my-8 max-w-125 space-y-4 border-4 border-zinc-900 bg-zinc-600 p-4 text-white"
    >
        <h2 class="text-center text-3xl">Character</h2>
        <p class="text-center">Level {{ currentLevel }}</p>
        <p v-if="showLevelUp" class="text-center text-sm text-green-400">
            Level up!
        </p>
        <p class="text-center">{{ currentLevelXp }} / {{ XP_PER_LEVEL }} XP</p>
        <div class="h-4 w-full border-2 border-zinc-900 bg-zinc-800">
            <div
                class="h-full bg-green-500"
                :style="{ width: currentLevelXp + '%' }"
            ></div>
        </div>
    </div>
</template>
