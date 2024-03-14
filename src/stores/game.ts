import { ref } from 'vue'
import { defineStore } from 'pinia'
import getHitSound from '@/composables/get-hit-sound'
import type { Ghost } from '@/types/Ghost'
import type { GameSettings } from '@/types/GameSettings'

export const useGameStore = defineStore('game', () => {
    // States
    const debug = ref<boolean>(false) // Debug mode
    const timer = ref<ReturnType<typeof setInterval> | null>(null) // Timer on running game
    const gameTime = ref<number>(0) // Current game time in seconds
    const running = ref<boolean>(false) // Game is running
    const gameOver = ref<boolean>(false) // Show game over screen
    const score = ref<number>(0)
    const highScore = ref<number>(0)

    // Ghosts
    const ghosts = ref<Ghost[]>([])

    // Constants
    const maxGameTime = ref(30) // Time in seconds for each game
    const maxGhosts = ref(10) // Max number of ghosts
    const spawnDuration = ref(1000 * 2) // in milliseconds

    // Background music
    const music = new Audio()

    // Rewind music when it ends
    music.addEventListener('ended', () => {
        music.currentTime = 0
        music.play()
    })

    // Hit sound
    const hitSound = getHitSound()

    // Play hit sound
    function playHitSound() {
        // Rewind and play
        hitSound.currentTime = 0
        hitSound.play()
    }

    // Change settings
    function setSettings(settings: Partial<GameSettings>) {
        maxGameTime.value = settings.maxGameTime || maxGameTime.value
        maxGhosts.value = settings.maxGhosts || maxGhosts.value
        spawnDuration.value = settings.spawnDuration || spawnDuration.value
        music.src = settings.music || music.src
        debug.value = settings.debug || false
    }

    return { debug, timer, running, gameOver, score, highScore, maxGameTime,
        gameTime, ghosts, maxGhosts, spawnDuration, music, setSettings, playHitSound }
})
