<script setup lang="ts">
import BooBash from '@/components/BooBash.vue'
import { ref } from 'vue'

// Optional and reactive game settings
// On change, the game will immediately update
const settings = ref({
    maxGameTime: 30,
    maxGhosts: 10,
    spawnDuration: 2000, // specify the spawn rate for new ghosts
    music: undefined // specify source for background music
})

// Event handler for new game
const newGame = () => {
    console.log('New game')
}

// Event handler for game over
// Emitting the score and high score
const gameOver = (event: { score: number; highScore: number }) => {
    console.log('Game over', event)
}
</script>

<template>
    <main class="absolute inset-0 w-full h-full bg-red-400">
        <BooBash :settings="settings" @new-game="newGame" @game-over="gameOver" />
    </main>
</template>

<style scoped>
</style>
