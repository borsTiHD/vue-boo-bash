import { ref, watch } from 'vue'
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

    // Music & sound effects
    const music = new Audio() // Background music
    const hitSound = getHitSound() // Hit sound
    const mute = ref(false) // Mute music & sound effects

    // Rewind music when it ends
    music.addEventListener('ended', () => {
        music.currentTime = 0
        music.play()
    })

    // Play music
    function playMusic() {
        if (mute.value) return
        music.play()
    }

    // Stop music
    function stopMusic() {
        music.pause()
    }

    // Play hit sound
    function playHitSound() {
        if (mute.value) return

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

        // Changing mute value will trigger the music to play or stop, depending on the game state
        mute.value = settings.mute || false
    }

    // Watch mute value to play or stop music
    watch(mute, (newMute) => {
        if (running.value && !newMute) {
            playMusic()
        } else if (running.value || newMute) {
            stopMusic()
        }
    })

    return { debug, timer, running, gameOver, score, highScore, maxGameTime,
        gameTime, ghosts, maxGhosts, spawnDuration, music, mute, setSettings, playMusic, stopMusic, playHitSound }
})
