import { ref } from 'vue'
import { defineStore } from 'pinia'
import BackgroundMusic from '@/assets/Ghost_House_Orchestral_Cover.mp3'
import type { Ghost } from '@/types/Ghost'

export const useGameStore = defineStore('game', () => {
    // States
    const timer = ref<ReturnType<typeof setInterval> | null>(null) // Timer on running game
    const gameTime = ref<number>(0) // Current game time in seconds
    const running = ref<boolean>(false) // Game is running
    const gameOver = ref<boolean>(false) // Show game over screen
    const score = ref<number>(0)
    const highScore = ref<number>(0)

    // Background music
    const music = new Audio(BackgroundMusic)

    // Ghosts
    const ghosts = ref<Ghost[]>([])

    // Constants
    const maxGameTime = 30 // Time in seconds for each game
    const maxGhosts = 10 // Max number of ghosts
    const spawnDuration = 1000 * 2 // in milliseconds

    return { timer, running, gameOver, score, highScore, maxGameTime, gameTime, ghosts, maxGhosts, spawnDuration, music }
})
