import { useGameStore } from '@/stores/game'
import { useWindowStore } from '@/stores/window'
import type { Ghost } from '@/types/Ghost'

export default function useAddingGhost(partialGhost?: Partial<Ghost>) {
    const gameStore = useGameStore()
    const windowStore = useWindowStore()

    // Create a random id
    const randomId = Math.floor(Math.random() * 1000)

    // Add new ghost
    gameStore.ghosts.push({
        id: randomId,
        itemRef: null,
        containerWidth: windowStore.width,
        containerHeight: windowStore.height,
        size: partialGhost?.size ?? Math.floor(Math.random() * 100) + 50,
        speed: partialGhost?.speed || undefined,
        duration: partialGhost?.duration || 30,
        ghost: partialGhost?.ghost || undefined,
        debug: partialGhost?.debug || false
    })
}
