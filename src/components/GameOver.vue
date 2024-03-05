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
    <div v-if="gameStore.gameOver" class="go-position go-background go-display">
        <span class="headline">Game Over</span>
        <span class="sub-text">High Score: {{ gameStore.highScore }}</span>
        <span class="sub-text">Score: {{ gameStore.score }}</span>

        <button class="button" @click="gameStore.gameOver = false">Close</button>
    </div>
</template>

<style scoped>
.go-position {
    position: relative;
    margin: auto;
    padding: 1rem;
}

.go-background {
    background-color: #ffffff;
    border-radius: 0.75rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.go-display {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}

.headline {
    font-size: 2.5rem;
    font-weight: bold;
}

.sub-text {
    font-size: 1.5rem;
    color: #4a5568;
}

.button {
    margin-top: 1rem;
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
}

.button:hover {
    background-color: #c53030;
}

.button:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.5);
}
</style>
