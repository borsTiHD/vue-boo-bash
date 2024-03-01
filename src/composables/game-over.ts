import { useGameStore } from '@/stores/game'
import useAddingGhost from '@/composables/adding-ghost'

export default function useGameOver() {
    const gameStore = useGameStore()

    // Stop game
    clearInterval(gameStore.timer!)
    gameStore.running = false
    gameStore.gameOver = true

    // Save high score
    if (gameStore.score > gameStore.highScore) {
        gameStore.highScore = gameStore.score
    }

    // Remove all ghosts
    gameStore.ghosts = []

    // Stop audio
    gameStore.music.pause()

    // Add initial ghost after 3 seconds of game over
    setTimeout(() => {
        useAddingGhost()
    }, 3000)
}
