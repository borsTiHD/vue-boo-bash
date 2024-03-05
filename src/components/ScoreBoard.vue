<script setup lang="ts">
import { computed } from 'vue'
import { useGameStore } from '@/stores/game'

const gameStore = useGameStore()
const show = computed(() => gameStore.score > 0 && gameStore.gameTime > 0)
</script>

<template>
    <div v-if="show" class="sb-position sb-background sb-display sb-select">
        <span class="headline">Welcome to Boo Bash 👻</span>
        <span class="sub-text">Score: {{ gameStore.score }}</span>
        <span class="sub-text">Time: {{ gameStore.gameTime }}</span>
    </div>
</template>

<style scoped>
.sb-position {
    position: relative;
    margin-top: 2rem;
    margin-bottom: auto;
    padding: 1rem;
}

.sb-background {
    background-color: #ffffff;
    border-radius: 0.75rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.sb-display {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}

.sb-select {
    user-select: none;
    pointer-events: none;
}

.headline {
    font-size: 1.5rem;
    font-weight: bold;
}

.sub-text {
    font-size: 1.5rem;
    color: #4a5568;
}
</style>
