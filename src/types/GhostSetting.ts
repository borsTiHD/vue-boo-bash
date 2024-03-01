export type GhostSetting = {
    id: number
    containerWidth: number
    containerHeight: number
    size?: number
    speed?: number
    duration?: number // Updates in milliseconds and should be the same as the transition duration in the template
    ghost?: number // Choose a ghost image
    difficulty?: number // 1-10
    debug?: boolean
}
