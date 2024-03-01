import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useWindowStore = defineStore('window', () => {
    // States
    const width = ref<number>(0)
    const height = ref<number>(0)

    return { width, height }
})
