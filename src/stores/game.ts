import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Ghost } from '@/types/Ghost'

export const useGameStore = defineStore('game', () => {
    // States
    const running = ref<boolean>(false)
    const gameOver = ref<boolean>(false)
    const score = ref<number>(0)
    const highScore = ref<number>(0)
    const gameTime = ref<number>(0)

    // Ghosts
    const ghosts = ref<Ghost[]>([])

    // Constants
    const maxGameTime = 30 // in seconds

    return { running, gameOver, score, highScore, maxGameTime, gameTime, ghosts }
})
