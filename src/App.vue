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
        <BooBash :settings="settings" @new-game="newGame" @game-over="gameOver">
            <!-- Scoreboard slot is optional -->
            <!-- <template #scoreboard="{ score, time, running }">
                <div v-if="running" class="scoreboard">
                    <h1>Scoreboard</h1>
                    <p>Your score: {{ score }}</p>
                    <p>Time left: {{ time }}</p>
                </div>
            </template> -->

            <!-- Game Over slot is optional -->
            <!-- <template #gameOver="{ score, highScore, show, closeGameOver }">
                <div v-if="show" class="scoreboard">
                    <h1>Game Over</h1>
                    <p>Your score: {{ score }}</p>
                    <p>High Score: {{ highScore }}</p>

                    <button @click="closeGameOver">Close</button>
                </div>
            </template> -->
        </BooBash>
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

.scoreboard {
    position: relative;
    margin-top: 2rem;
    margin-bottom: auto;
    padding: 1rem;
    color: #4a5568;
    font-size: 1.5rem;
    text-align: right;

    background-color: #ffffff;
    border-radius: 0.75rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}
</style>
