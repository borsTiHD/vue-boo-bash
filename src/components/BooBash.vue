<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SingleGhost from '@/components/SingleGhost.vue'
import ScoreBoard from '@/components/ScoreBoard.vue'
import GameOver from '@/components/GameOver.vue'
import useGameReset from '@/composables/useGameReset'
import useAddingGhost from '@/composables/useAddingGhost'
import { useGameStore } from '@/stores/game'
import { useWindowStore } from '@/stores/window'
import BackgroundMusic from '@/assets/Ghost_House_Orchestral_Cover.mp3'
import type { Ghost } from '@/types/Ghost'

// TODO: Game over sound
// TODO: Custom cursor

// Game boundaries
const ghostContainer = ref<HTMLElement | null>(null)

// Store
const windowStore = useWindowStore()
const gameStore = useGameStore()

// Background music
const audio = new Audio() // Create an <audio> element
audio.src = BackgroundMusic // Set the source of your MP3 file

// Game start
const gameStart = () => {
    // Reset the game
    useGameReset()

    // Set the game to running state and reset the game time
    gameStore.running = true

    // Play audio
    audio.play()

    // Start the game timer
    const timer = setInterval(() => {
        gameStore.gameTime--

        if (gameStore.gameTime <= 0) {
            gameOver(timer)
        }
    }, 1000)

    // Add new ghost every x seconds until max ghosts reached
    const maxGhosts = 10
    const intervalDuration = 1000 * 2
    const ghostInterval = setInterval(() => {
        if (gameStore.ghosts.length < maxGhosts) {
            useAddingGhost()
        } else {
            clearInterval(ghostInterval)
        }

        // If the game is not running, clear the interval
        if (!gameStore.running) {
            clearInterval(ghostInterval)
        }
    }, intervalDuration)
}

// Game over
const gameOver = (timer: ReturnType<typeof setInterval>) => {
    gameStore.running = false
    clearInterval(timer)

    // Save high score
    if (gameStore.score > gameStore.highScore) {
        gameStore.highScore = gameStore.score
    }

    // Remove all ghosts
    gameStore.ghosts = []

    // Show game over screen
    gameStore.gameOver = true

    // Stop audio
    audio.pause()

    // Add initial ghost after 3 seconds of game over
    setTimeout(() => {
        useAddingGhost()
    }, 3000)
}

// Ghost hit
const hit = (ghost: Ghost) => {
    // If the game is not running,
    // hitting the first ghost will start the game
    if (!gameStore.running) {
        gameStart()
    }

    // Increase the score
    if (gameStore.running && ghost) {
        gameStore.score++
    }
}

// Set container sizes
const setSizes = () => {
    windowStore.width = ghostContainer.value?.clientWidth ?? 0
    windowStore.height = ghostContainer.value?.clientHeight ?? 0

    // Set new boundaries for all ghosts
    gameStore.ghosts.forEach((ghost) => {
        ghost.containerWidth = windowStore.width
        ghost.containerHeight = windowStore.height
    })
}

onMounted(() => {
    // Set initial sizes
    setSizes()

    // Reset the game
    useGameReset()

    // On window resize, set sizes
    window.addEventListener('resize', setSizes)
})
</script>

<template>
    <div
        ref="ghostContainer"
        class="absolute inset-0 flex justify-center w-full h-full transition-all ease-in-out overflow-hidden z-40"
        :class="{ 'bg-black/50': gameStore.running }"
    >
        <ScoreBoard />
        <GameOver />
        <SingleGhost
            v-for="(ghost) in gameStore.ghosts"
            :ref="el => ghost.itemRef = el"
            :key="ghost.id"
            :settings="{
                id: ghost.id,
                containerWidth: windowStore.width,
                containerHeight: windowStore.height,
                size: ghost.size,
                speed: ghost.speed,
                duration: ghost.duration,
                ghost: ghost.ghost,
                debug: ghost.debug
            }"
            @hit="hit(ghost)"
        />
    </div>
</template>
