<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, useSlots } from 'vue'
import SingleGhost from '@/components/SingleGhost.vue'
import ScoreBoard from '@/components/ScoreBoard.vue'
import GameOver from '@/components/GameOver.vue'
import useGameStart from '@/composables/game-start'
import useGameReset from '@/composables/game-reset'
import { useGameStore } from '@/stores/game'
import { useWindowStore } from '@/stores/window'
import type { Ghost } from '@/types/Ghost'
import type { GameSettings } from '@/types/GameSettings'

// TODO: Game over sound
// TODO: Custom cursor

const props = defineProps<{
    settings?: Partial<GameSettings>
}>()

// Game boundaries
const ghostContainer = ref<HTMLElement | null>(null)

// Slots for ScoreBoard and GameOver
const slots = useSlots()

// Store
const windowStore = useWindowStore()
const gameStore = useGameStore()

// Ghost hit
const hit = (ghost: Ghost) => {
    // If the game is not running,
    // hitting the first ghost will start the game
    if (!gameStore.running) {
        useGameStart(gameOver)
        emit('newGame')
    }

    // Increase the score
    if (gameStore.running && ghost) {
        gameStore.score++
    }
}

// Close the game over screen
const closeGameOver = () => {
    gameStore.gameOver = false
}

// Game over: emit event
const gameOver = () => {
    emit('gameOver', {
        score: gameStore.score,
        highScore: gameStore.highScore
    })
}

// Emit events
const emit = defineEmits(['newGame', 'gameOver'])

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

// Deep watch for settings
watch(() => props.settings, (settings) => {
    if (settings) {
        gameStore.setSettings(settings)
    }
}, { deep: true })

// On mounted, set sizes, reset the game and set settings if provided
onMounted(() => {
    // Set initial sizes
    setSizes()

    // Set settings if provided
    if (props.settings) {
        gameStore.setSettings(props.settings)
    }

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
        class="container-position container-transition-all global-font"
        :class="{ 'background-black-50': gameStore.running, 'background-black-20': gameStore.gameOver }"
    >
        <!-- Showing scoreboard slot or default ScoreBoard component -->
        <slot
            v-if="slots.scoreboard"
            name="scoreboard"
            :score="gameStore.score"
            :time="gameStore.gameTime"
            :running="gameStore.running"
        />
        <ScoreBoard v-else />

        <!-- Showing game over slot or default GameOver component -->
        <slot
            v-if="slots.gameOver"
            name="gameOver"
            :score="gameStore.score"
            :highScore="gameStore.highScore"
            :show="gameStore.gameOver"
            :closeGameOver="closeGameOver"
        />
        <GameOver v-else />

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

<style scoped>
.container-position {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    height: 100%;
    width: 100%;
    overflow: hidden;
    z-index: 40;
}

.container-transition-all {
    transition-property: all;
    transition-duration: 0.3s;
    transition-timing-function: ease-in-out;
}

.background-black-50 {
    background-color: rgba(0, 0, 0, 0.5);
}

.background-black-20 {
    background-color: rgba(0, 0, 0, 0.2);
}

.global-font {
    font-family: 'Roboto', sans-serif;
}
</style>
