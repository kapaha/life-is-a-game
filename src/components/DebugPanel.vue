<script setup>
import { ref } from 'vue';
import { useGameState } from '@/composables/useGameState';

const { addXp, reset } = useGameState();

const xpAmount = ref(50);
</script>

<template>
    <aside
        class="fixed right-4 bottom-4 space-y-4 border-2 border-dashed border-purple-500 bg-zinc-800 p-4"
    >
        <p class="text-lg text-purple-500">Debug Panel</p>

        <div class="flex flex-col gap-4">
            <div class="space-y-2">
                <p class="text-white">Add XP</p>
                <input
                    v-model.number="xpAmount"
                    type="number"
                    class="w-20 bg-zinc-700 px-2 py-1 text-sm text-white"
                />
                <button
                    class="bg-yellow-500 px-3 py-1 text-sm text-white"
                    @click="addXp(xpAmount)"
                >
                    Add XP
                </button>
            </div>

            <div class="space-y-2">
                <p class="text-white">Reset</p>
                <button
                    class="bg-red-500 px-3 py-1 text-sm text-white"
                    @click="reset()"
                >
                    Reset
                </button>
            </div>
        </div>
    </aside>
</template>
