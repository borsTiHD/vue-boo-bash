<script setup lang="ts">
import { useGameStore } from '@/stores/game'

const gameStore = useGameStore()

// Register ESC key to close the Game Over screen
window.addEventListener('keyup', (event) => {
    if (event.key === 'Escape') {
        gameStore.gameOver = false
    }
})
</script>

<template>
    <div v-if="gameStore.gameOver" class="relative m-auto p-4 bg-white shadow-lg rounded-xl flex flex-col justify-between items-center gap-2">
        <span class="text-3xl font-bold">Game Over</span>
        <span class="text-2xl">High Score: {{ gameStore.highScore }}</span>
        <span class="text-2xl">Score: {{ gameStore.score }}</span>

        <button
            class="mt-4 px-4 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 focus:outline-none"
            @click="gameStore.gameOver = false"
        >Close</button>
    </div>
</template>
