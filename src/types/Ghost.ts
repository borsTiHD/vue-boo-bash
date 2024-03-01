import type { ComponentPublicInstance } from 'vue'
import type { GhostSetting } from '@/types/GhostSetting'

export interface Ghost extends GhostSetting {
    id: number
    itemRef: Element | ComponentPublicInstance | null
}
