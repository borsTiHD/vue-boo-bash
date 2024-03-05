<script setup lang="ts">
import { ref } from 'vue'

export type Position = {
    x: number
    y: number
}

const show = ref<boolean>(false)
const left = ref<number>(0)
const top = ref<number>(0)
const hitText = '+1 👻'

const hit = (position: Position) => {
    left.value = position.x
    top.value = position.y
    show.value = true

    setTimeout(() => {
        show.value = false
    }, 1000)
}

// Expose the hit function
defineExpose({ hit })
</script>

<template>
    <span
        v-if="show"
        class="hit-position hit-animate hit-select"
        :style="{
            left: left + 'px',
            top: top + 'px',
        }"
    >{{ hitText }}</span>
</template>

<style scoped>
.hit-position {
    position: absolute;
    padding: 0.5rem;
    border-radius: 0.375rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    background-color: rgba(0, 0, 0, 0.5);
    color: #ffffff;
}

.hit-select {
    user-select: none;
    pointer-events: none;
}

.hit-animate {
    animation: bounce 1s infinite;
}

@keyframes bounce {
    0%, 50%, 80%, 100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-20px);
    }
    60% {
        transform: translateY(-10px);
    }
}
</style>
