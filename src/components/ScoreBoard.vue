<script setup lang="ts">
import { computed } from 'vue'
import { useGameStore } from '@/stores/game'

const gameStore = useGameStore()
const show = computed(() => gameStore.score > 0 && gameStore.gameTime > 0)
</script>

<template>
    <div v-if="show" class="relative mb-auto mt-8 p-4 bg-white shadow-lg rounded-xl flex flex-col justify-between items-center gap-2 select-none pointer-events-none">
        <span class="text-2xl font-bold">Welcome to Boo Bash 👻</span>
        <span class="text-2xl">Score: {{ gameStore.score }}</span>
        <span class="text-2xl">Time: {{ gameStore.gameTime }}</span>
    </div>
</template>
