<script setup lang="ts">
import { useGameStore } from '@/stores/game'
import useGameStart from '@/composables/game-start'

const gameStore = useGameStore()

const newGame = () => {
    useGameStart()

    // Increase the score by 1
    // because on normal game start, the user hits the first ghost to start the game
    gameStore.score++
}

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
            class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none"
            @click="newGame"
        >Play Again</button>
    </div>
</template>
