<template>
    <div v-if="show" class="relative m-auto p-4 bg-white rounded-xl flex flex-col justify-between items-center gap-2 select-none pointer-events-none">
        <span class="text-3xl font-bold">Game Over</span>
        <span class="text-2xl">Highscore: {{ props.highscore }}</span>
        <span class="text-2xl">Score: {{ props.score }}</span>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
    show: boolean
    score: number
    highscore: number
}>()
</script>
