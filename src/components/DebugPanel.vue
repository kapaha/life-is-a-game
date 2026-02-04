<script setup>
import { ref } from 'vue';

const emit = defineEmits(['add-xp']);

const xpAmount = ref(50);
</script>

<template>
    <aside
        class="fixed right-4 bottom-4 space-y-2 border-2 border-dashed border-yellow-500 bg-zinc-800 p-4"
    >
        <h3 class="text-sm text-yellow-500">Debug</h3>
        <div class="flex items-center gap-2">
            <input
                v-model.number="xpAmount"
                type="number"
                class="w-20 bg-zinc-700 px-2 py-1 text-sm text-white"
            />
            <button
                class="bg-yellow-500 px-3 py-1 text-sm text-black"
                @click="emit('add-xp', xpAmount)"
            >
                Add XP
            </button>
        </div>
    </aside>
</template>
