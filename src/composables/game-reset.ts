import { useGameStore } from '@/stores/game'
import useAddingGhost from '@/composables/adding-ghost'

export default function useGameReset() {
    const gameStore = useGameStore()

    gameStore.gameTime = gameStore.maxGameTime
    gameStore.score = 0
    gameStore.running = false
    gameStore.gameOver = false
    gameStore.ghosts = [] // Remove all ghosts

    useAddingGhost() // Add initial ghost
}
