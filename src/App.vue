<script setup lang="ts">
import BooBash from '@/components/BooBash.vue'
import BackgroundMusic from '@/assets/Ghost_House_Orchestral_Cover.mp3'
import { ref } from 'vue'

// Optional and reactive game settings
// On change, the game will immediately update
const settings = ref({
    maxGameTime: 60, // specify the game time in seconds - default 30 seconds
    maxGhosts: 10, // specify the maximum number of ghosts - default 10
    spawnDuration: 2000, // specify the spawn rate for new ghosts - default 2000ms
    music: BackgroundMusic, // specify source for background music
    mute: true, // specify if the game should be muted - default false
    showMuteButton: true // specify if the mute button should be shown - default false
    // debug: true
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

// Mute button
const mute = () => {
    settings.value.mute = !settings.value.mute
}
</script>

<template>
    <main class="main-background">
        <!-- Mute button -->
        <button class="mute-button" @click="mute" >
            {{ settings.mute ? 'Unmute' : 'Mute' }}
        </button>

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

.mute-button {
    position: relative;
    margin-top: 1rem;
    margin-left: 1rem;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    background-color: #dc2626;
    color: #ffffff;
    cursor: pointer;
    border-radius: 0.375rem;
    border: none;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    z-index: 1000;
}

.mute-button:hover {
    background-color: #c53030;
}

.mute-button:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.5);
}
</style>
