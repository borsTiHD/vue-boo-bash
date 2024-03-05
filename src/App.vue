<script setup lang="ts">
import BooBash from '@/components/BooBash.vue'
import { ref } from 'vue'

// Optional and reactive game settings
// On change, the game will immediately update
const settings = ref({
    maxGameTime: 60,
    maxGhosts: 10,
    spawnDuration: 2000, // specify the spawn rate for new ghosts
    music: undefined, // specify source for background music
    debug: true
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
    <main class="main-background">
        <BooBash :settings="settings" @new-game="newGame" @game-over="gameOver" />
    </main>
</template>

<style scoped>
.main-background {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #f87171;
}
</style>
