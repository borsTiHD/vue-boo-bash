import { useGameStore } from '@/stores/game'
import useGameReset from '@/composables/game-reset'
import useGameOver from '@/composables/game-over'
import useAddingGhost from '@/composables/adding-ghost'

export default function useGameStart(callback?: () => void) {
    const gameStore = useGameStore()

    // Reset game
    useGameReset()

    // Start game
    gameStore.running = true

    // Play audio
    gameStore.playMusic()

    // Start game timer
    gameStore.timer = setInterval(() => {
        gameStore.gameTime-- // Decrease game time

        // Game Over: Time's up
        if (gameStore.gameTime <= 0) {
            useGameOver()
            if (callback) {
                callback()
            }
        }
    }, 1000)

    // Add new ghost every x seconds until max ghosts reached
    const ghostInterval = setInterval(() => {
        if (gameStore.ghosts.length < gameStore.maxGhosts) {
            useAddingGhost()
        } else {
            clearInterval(ghostInterval)
        }

        // If the game is not running, clear the interval
        if (!gameStore.running) {
            clearInterval(ghostInterval)
        }
    }, gameStore.spawnDuration)
}
