<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import HitMarker from '@/components/HitMarker.vue'
import getGhostImage from '@/composables/get-ghost-image'
import { useGameStore } from '@/stores/game'
import type { GhostSetting } from '@/types/GhostSetting'

const props = defineProps<{
    settings: GhostSetting
}>()

// TODO: Use difficulty to change the ghost's behaviour

// Game store
const gameStore = useGameStore()

// Hit marker ref
const hitMarkerRef = ref<InstanceType<typeof HitMarker> | null>(null)
const image = ref<string>('')

// Container sizes
const containerWidth = ref<number>(props.settings.containerWidth)
const containerHeight = ref<number>(props.settings.containerHeight)

// Ghost settings
const debug = ref<boolean>(props.settings.debug ?? false)
const interval = ref<ReturnType<typeof setInterval> | null>(null)
const duration = ref<number>(props.settings.duration ?? 10) // Updates in milliseconds and should be the same as the transition duration in the template
const difficulty = ref<number>(props.settings.difficulty ?? 1)
const invincible = ref<boolean>(false)
const left = ref<number>(0)
const top = ref<number>(0)
const size = ref<number>(props.settings.size ?? 0)
const speed = ref<number>(0)
const opacity = ref<number>(0)
const horizontalDirection = ref<'left' | 'right'>('right')
const verticalDirection = ref<'up' | 'down'>('down')
const facing = computed(() => horizontalDirection.value)

// Constants
const minSize = 50
const maxSize = 150
const minDifficulty = 1
const maxDifficulty = 10
const minSpeed = 1
const maxSpeed = 10
const minOpacity = 0.2
const maxOpacity = 0.9
const padding = -200 // Padding for boundary check

// Hitting edge of the container counter
const edgeCounter = ref<number>(0)

// Set random size, speed, and opacity if not provided
if (size.value === 0) { setRandomSize() }
if (speed.value === 0) { setRandomSpeed() }
if (opacity.value === 0) { changeOpacityRandomly() }

// Set default position and facing
setRandomPosition()
setRandomFacing()
setRandomDirection()

// Define ghost image based on settings or random
if (props.settings?.ghost) {
    image.value = getGhostImage(props.settings.ghost - 1)
} else {
    image.value = getGhostImage()
}

// Set new difficulty
function setDifficulty(newDifficulty: number) {
    // Pay attention to the maximum and minimum difficulty
    if (newDifficulty > maxDifficulty) { newDifficulty = maxDifficulty }
    if (newDifficulty < minDifficulty) { newDifficulty = minDifficulty }

    difficulty.value = newDifficulty
}

// Sets a random size
function setRandomSize() {
    size.value = Math.floor(Math.random() * (maxSize - minSize)) + minSize
}

// Sets a random position
function setRandomPosition() {
    let newLeft = Math.floor(Math.random() * containerWidth.value - size.value)
    let newTop = Math.floor(Math.random() * containerHeight.value - size.value)

    // Check if the new position is not too close to the edge
    // Set position to the middle of the container
    if (isCloseToEdge(newLeft, newTop).horizontal) { newLeft = containerWidth.value / 2 - size.value / 2 }
    if (isCloseToEdge(newLeft, newTop).vertical) { newTop = containerHeight.value / 2 - size.value / 2 }

    // Set new position
    left.value = newLeft
    top.value = newTop
}

// Sets a random horizontal direction
function setRandomFacing() {
    horizontalDirection.value = randomBoolean(50) ? 'left' : 'right'
}

// Sets a random vertical direction
function setRandomDirection() {
    verticalDirection.value = randomBoolean(50) ? 'up' : 'down'
}

// Sets a random speed
function setRandomSpeed() {
    speed.value = Math.random() * 2 + 10
}

// Change speed randomly
function changeSpeedRandomly() {
    // Set acceleration or deceleration
    if (randomBoolean(50)) {
        speed.value += Math.random() * 2 + 1 + difficulty.value
    } else {
        speed.value -= Math.random() * 2 + 1 + difficulty.value
    }

    // Pay attention to the maximum and minimum speed
    if (speed.value > maxSpeed) { speed.value = maxSpeed - 1 }
    if (speed.value < minSpeed + difficulty.value) { speed.value = minSpeed + 1 }
}

// Set random opacity
function setRandomOpacity() {
    opacity.value = Math.random() * 0.7 + 0.2
}

// Change opacity randomly
function changeOpacityRandomly() {
    // Add or remove opacity randomly
    if (randomBoolean(50)) {
        opacity.value += Math.random()
    } else {
        opacity.value -= Math.random()
    }

    // Pay attention to the maximum and minimum opacity
    if (opacity.value > maxOpacity) { opacity.value = maxOpacity - 0.1 }
    if (opacity.value < minOpacity) { opacity.value = minOpacity + 0.1 }
}

// Random boolean with a percentage chance
// Default chance is 1% for true
function randomBoolean(percentage = 1) {
    // Create random number between 1 and 100 with only integer
    const random = Math.floor(Math.random() * 100) + 1
    return random < percentage
}

// Check if ghost is moving to close to the edge
function isCloseToEdge(newLeft?: number, newTop?: number) {
    const checkLeft = newLeft ?? left.value
    const checkTop = newTop ?? top.value

    const closeToLeft = checkLeft < 0 + padding
    const closeToRight = checkLeft + size.value + padding > containerWidth.value
    const closeToTop = checkTop < 0 + padding
    const closeToBottom = checkTop + size.value + padding > containerHeight.value

    const check = {
        horizontal: closeToLeft || closeToRight,
        vertical: closeToTop || closeToBottom,
        left: closeToLeft,
        right: closeToRight,
        top: closeToTop,
        bottom: closeToBottom
    }

    // Increase the edge counter if the ghost is close to the edge
    if (check.horizontal || check.vertical) {
        edgeCounter.value++

        // Check if the ghost is stuck at the edge
        if (edgeCounter.value > 10) {
            setRandomPosition()
            edgeCounter.value = 0
        }
    }

    return check
}

// Ghost hit by a mouse click
function hit(event: MouseEvent) {
    if (invincible.value) { return }

    const mousePosition = {
        x: event.clientX,
        y: event.clientY
    }

    // Show hit marker
    hitMarkerRef.value?.hit({
        x: mousePosition.x - 35,
        y: mousePosition.y - 80
    })

    // Play hit sound
    gameStore.playHitSound()

    // Set invincible to avoid multiple hits
    invincible.value = true

    // Opacity is set to 0 to make the ghost transparent
    opacity.value = 0

    // Stop moving the ghost
    stopMoving()

    // Set new random size, speed, and position
    setRandomSize()
    setRandomSpeed()
    setRandomPosition()

    // Increase the difficulty of the ghost
    setDifficulty(difficulty.value + 1)

    // Start moving the ghost again after a short delay
    setTimeout(() => {
        setRandomOpacity()
        startMoving()
        invincible.value = false
    }, 3000)

    // Emits a hit event
    emit('hit')
}

// Move the ghost
function move() {
    // Check if the ghost is close to the horizontal edge
    // Change direction if the ghost is close to the edge
    // If not close to the edge, randomly change direction
    if (isCloseToEdge().horizontal) {
        horizontalDirection.value = horizontalDirection.value === 'right' ? 'left' : 'right'
    } else if (randomBoolean(2)) {
        horizontalDirection.value = horizontalDirection.value === 'right' ? 'left' : 'right'
    }

    // Check if the ghost is close to the vertical edge
    // Change direction if the ghost is close to the edge
    // If not close to the edge, randomly change direction
    if (isCloseToEdge().vertical) {
        verticalDirection.value = verticalDirection.value === 'down' ? 'up' : 'down'
    } else if (randomBoolean(2)) {
        verticalDirection.value = verticalDirection.value === 'down' ? 'up' : 'down'
    }

    // Move the ghost to the right or left with random speed
    if (randomBoolean(2)) { changeSpeedRandomly() }
    if (horizontalDirection.value === 'right') {
        left.value += speed.value
    } else {
        left.value -= speed.value
    }

    // Move the ghost up or down with random speed
    if (randomBoolean(2)) { changeSpeedRandomly() }
    if (verticalDirection.value === 'down') {
        top.value += speed.value
    } else {
        top.value -= speed.value
    }

    // Set random opacity
    if (randomBoolean(5)) { changeOpacityRandomly() }
}

// Set container size
function setContainerSize(newWidth: number, newHeight: number) {
    containerWidth.value = newWidth
    containerHeight.value = newHeight
}

// Start moving the ghost
function startMoving() {
    move() // Move the ghost immediately
    interval.value = setInterval(() => {
        move()
    }, duration.value)
}

// Stop moving the ghost
function stopMoving() {
    if (interval.value) { clearInterval(interval.value) }
}

// Watch settings for changes
watch(() => props.settings, (newSettings, old) => {
    if (newSettings) {
        if (
            newSettings.containerWidth && newSettings.containerHeight
            && (newSettings.containerWidth !== old.containerWidth || newSettings.containerHeight !== old.containerHeight)
        ) {
            setContainerSize(newSettings.containerWidth, newSettings.containerHeight)

            // Set random position if the container size changes
            // to avoid ghost being stuck outside the container
            setRandomPosition()
        }
        if (newSettings.size) { size.value = newSettings.size }
        if (newSettings.speed) { speed.value = newSettings.speed }
        if (newSettings.duration) { duration.value = newSettings.duration }
        if (newSettings.ghost) { image.value = getGhostImage(newSettings.ghost - 1) }
    }
}, { deep: true })

// Emit events
const emit = defineEmits(['hit'])

// Expose start and stop moving functions
defineExpose({
    setContainerSize,
    startMoving,
    stopMoving,
    setDifficulty
})

// Start moving the ghost
startMoving()
</script>

<template>
    <HitMarker ref="hitMarkerRef" />
    <img
        :src="image"
        class="ghost-position ghost-style ghost-transition ghost-select"
        :class="{
            'ghost-transform-right': facing === 'right',
            // Only if the ghost is moving
            // makes him visible on hover
            // show crosshair cursor
            'ghost-crosshair ghost-opacity-hover': !invincible && interval
        }"
        :style="{
            left: left + 'px',
            top: top + 'px',
            width: size + 'px',
            opacity: opacity
        }"
        @mousedown="hit"
    >

    <!-- Small box to show the ghost position for debugging -->
    <div
        v-if="debug"
        class="ghost-debug ghost-select"
        :style="{
            left: left + 'px',
            top: top + 'px',
        }"
    />
</template>

<style scoped>
.ghost-position {
    position: absolute;
}

.ghost-style {
    filter: drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1));
}

.ghost-transition {
    transition-property: all;
    transition-duration: 0.3s;
    transition-timing-function: ease-in-out;
}

.ghost-transform-right {
    transform: scaleX(-1);
}

.ghost-select {
    user-select: none;
}

.ghost-opacity-hover:hover {
    opacity: 1 !important;
}

.ghost-crosshair {
    cursor: crosshair;
}

.ghost-debug {
    position: absolute;
    padding: 0.5rem;
    border-radius: 0.25rem;
    background-color: #dc2626;
}
</style>
