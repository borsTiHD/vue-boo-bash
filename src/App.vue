<script setup lang="ts">
import BooBash from '@/components/BooBash.vue'

const gameOver = (event: { score: number; highScore: number }) => {
    console.log('Game over', event)
}

const newGame = () => {
    console.log('New game')
}
</script>

<template>
    <main class="absolute inset-0 w-full h-full bg-red-400">
        <BooBash @new-game="newGame" @game-over="gameOver" />
    </main>
</template>

<style scoped>
</style>
