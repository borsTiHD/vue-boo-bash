<template>
    <div v-if="gameStore.gameOver" class="relative m-auto p-4 bg-white shadow-lg rounded-xl flex flex-col justify-between items-center gap-2 select-none pointer-events-none">
        <span class="text-3xl font-bold">Game Over</span>
        <span class="text-2xl">High Score: {{ gameStore.highScore }}</span>
        <span class="text-2xl">Score: {{ gameStore.score }}</span>
    </div>
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/game'

const gameStore = useGameStore()
</script>
