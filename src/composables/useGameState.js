import { ref, computed, watch } from 'vue';
import { XP_PER_LEVEL, XP_PER_TASK, STORAGE_KEY } from '@/config/game';

let saved = null;
try {
    saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
} catch {
    // ignore corrupt data
}

const tasks = ref(saved?.tasks ?? []);
const totalXp = ref(saved?.totalXp ?? 0);
const currentLevel = ref(saved?.currentLevel ?? 1);

const currentLevelXp = computed(() => totalXp.value % XP_PER_LEVEL);

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

function addXp(amount) {
    totalXp.value += amount;

    while (totalXp.value >= currentLevel.value * XP_PER_LEVEL) {
        currentLevel.value += 1;
    }
}

function addTask(name) {
    tasks.value.push({
        id: self.crypto.randomUUID(),
        name,
        isComplete: false
    });
}

function completeTask(id) {
    tasks.value = tasks.value.map((task) => {
        if (task.id === id && !task.isComplete) {
            addXp(XP_PER_TASK);
            return { ...task, isComplete: true };
        }
        return task;
    });
}

function reset() {
    tasks.value = [];
    totalXp.value = 0;
    currentLevel.value = 1;
}

export function useGameState() {
    return {
        tasks,
        totalXp,
        currentLevel,
        currentLevelXp,
        XP_PER_LEVEL,
        XP_PER_TASK,
        addXp,
        addTask,
        completeTask,
        reset
    };
}
