<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SingleGhost from '@/components/SingleGhost.vue'
import ScoreBoard from '@/components/ScoreBoard.vue'
import GameOver from '@/components/GameOver.vue'
import BackgroundMusic from '@/assets/Ghost_House_Orchestral_Cover.mp3'
import type { ComponentPublicInstance } from 'vue'
import type { GhostSetting } from '@/components/SingleGhost.vue'

interface Ghost extends GhostSetting {
    id: number
    itemRef: Element | ComponentPublicInstance | null
}

// TODO: Game over sound
// TODO: Custom cursor

// Game boundaries
const ghostContainer = ref<HTMLElement | null>(null)
const containerWidth = ref<number>(ghostContainer.value?.clientWidth ?? 0)
const containerHeight = ref<number>(ghostContainer.value?.clientHeight ?? 0)

// Game state
const running = ref<boolean>(false)
const showGameOver = ref<boolean>(false)
const score = ref<number>(0)
const highscore = ref<number>(0)
const maxGameTime = 30 // in seconds
const currentGameTime = ref<number>(0)

const ghosts = ref<Ghost[]>([])

// Background music
const audio = new Audio() // Create an <audio> element
audio.src = BackgroundMusic // Set the source of your MP3 file

// Game start
const gameStart = () => {
    // Reset the game
    gameReset()
    ghosts.value = []

    // Set the game to running state and reset the game time
    running.value = true

    // Play audio
    audio.play()

    // Start the game timer
    const timer = setInterval(() => {
        currentGameTime.value--

        if (currentGameTime.value <= 0) {
            gameOver(timer)
        }
    }, 1000)

    // Add new ghost every x seconds until max ghosts reached
    const maxGhosts = 10
    const intervalDuration = 1000 * 2
    const ghostInterval = setInterval(() => {
        if (ghosts.value.length < maxGhosts) {
            addingGhost()
        } else {
            clearInterval(ghostInterval)
        }

        // If the game is not running, clear the interval
        if (!running.value) {
            clearInterval(ghostInterval)
        }
    }, intervalDuration)
}

// Game over
const gameOver = (timer: ReturnType<typeof setInterval>) => {
    running.value = false
    clearInterval(timer)

    // Save highscore
    if (score.value > highscore.value) {
        highscore.value = score.value
    }

    // Remove all ghosts
    ghosts.value = []

    // Show game over screen
    showGameOver.value = true

    // Stop audio
    audio.pause()

    // Add initial ghost after 3 seconds of game over
    setTimeout(() => {
        addingGhost()
    }, 3000)
}

// Reset the game
const gameReset = () => {
    running.value = false
    showGameOver.value = false
    score.value = 0
    currentGameTime.value = maxGameTime
    ghosts.value = [] // Remove all ghosts
    addingGhost() // Add initial ghost
}

// Add a ghost
const addingGhost = (number?: number) => {
    // Create a random id
    const randomId = Math.floor(Math.random() * 1000)

    // Create a new ghost
    const ghost: Ghost = {
        id: randomId,
        itemRef: null,
        containerWidth: containerWidth.value,
        containerHeight: containerHeight.value,
        size: Math.floor(Math.random() * 100) + 50,
        speed: undefined,
        duration: 30,
        ghost: number,
        debug: false
    }

    // Add the ghost to the ghosts array
    ghosts.value.push(ghost)
}

// Ghost hit
const hit = () => {
    // If the game is not running,
    // hitting the first ghost will start the game
    if (!running.value) {
        gameStart()
    }

    // Increase the score
    score.value++
}

// Set container sizes
const setSizes = () => {
    containerWidth.value = ghostContainer.value?.clientWidth ?? 0
    containerHeight.value = ghostContainer.value?.clientHeight ?? 0
}

// Set new sizes and update the ghosts boundaries
const setNewSizes = () => {
    setSizes()
    ghosts.value.forEach((ghost) => {
        ghost.containerWidth = containerWidth.value
        ghost.containerHeight = containerHeight.value
    })
}

onMounted(() => {
    // Set initial sizes
    setSizes()

    // Reset the game
    gameReset()

    // On window resize, set sizes
    window.addEventListener('resize', setNewSizes)
})
</script>

<template>
    <div ref="ghostContainer" class="absolute inset-0 flex justify-center w-full h-full transition-all ease-in-out overflow-hidden z-40" :class="{ 'bg-black/50': running }">
        <ScoreBoard :score="score" :timer="currentGameTime" />
        <GameOver :show="showGameOver" :score="score" :highscore="highscore" />
        <SingleGhost
            v-for="(ghost) in ghosts"
            :ref="el => ghost.itemRef = el"
            :key="ghost.id"
            :settings="{
                id: ghost.id,
                containerWidth: containerWidth,
                containerHeight: containerHeight,
                size: ghost.size,
                speed: ghost.speed,
                duration: ghost.duration,
                ghost: ghost.ghost,
                debug: ghost.debug
            }"
            @hit="hit"
        />
    </div>
</template>
