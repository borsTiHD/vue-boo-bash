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
        class="absolute animate-bounce bg-black/50 text-white p-2 shadow-lg rounded-md select-none pointer-events-none"
        :style="{
            left: left + 'px',
            top: top + 'px',
        }"
    >{{ hitText }}</span>
</template>
