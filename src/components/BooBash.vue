<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import SingleGhost from '@/components/SingleGhost.vue'
import ScoreBoard from '@/components/ScoreBoard.vue'
import GameOver from '@/components/GameOver.vue'
import useGameStart from '@/composables/game-start'
import useGameReset from '@/composables/game-reset'
import { useGameStore } from '@/stores/game'
import { useWindowStore } from '@/stores/window'
import type { Ghost } from '@/types/Ghost'

// TODO: Game over sound
// TODO: Custom cursor

// Game boundaries
const ghostContainer = ref<HTMLElement | null>(null)

// Store
const windowStore = useWindowStore()
const gameStore = useGameStore()

// Ghost hit
const hit = (ghost: Ghost) => {
    // If the game is not running,
    // hitting the first ghost will start the game
    if (!gameStore.running) {
        useGameStart()
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

onBeforeUnmount(() => {
    gameStore.music.pause() // Pause the music
    window.removeEventListener('resize', setSizes)
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