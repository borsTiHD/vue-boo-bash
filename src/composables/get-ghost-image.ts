import ghost1 from '@/assets/img/ghosts/ghost1.png'
import ghost2 from '@/assets/img/ghosts/ghost2.png'
import ghost3 from '@/assets/img/ghosts/ghost3.png'
import ghost4 from '@/assets/img/ghosts/ghost4.png'
import ghost5 from '@/assets/img/ghosts/ghost5.png'
import ghost6 from '@/assets/img/ghosts/ghost6.png'
import ghost7a from '@/assets/img/ghosts/ghost7-1.png'
import ghost7b from '@/assets/img/ghosts/ghost7-2.png'
import ghost7c from '@/assets/img/ghosts/ghost7-3.png'
import ghost7d from '@/assets/img/ghosts/ghost7-4.png'
import ghost7e from '@/assets/img/ghosts/ghost7-5.png'
import ghost7f from '@/assets/img/ghosts/ghost7-6.png'
import ghost8 from '@/assets/img/ghosts/ghost8.png'
import ghost9 from '@/assets/img/ghosts/ghost9.png'
import ghost10 from '@/assets/img/ghosts/ghost10.png'
import ghost11 from '@/assets/img/ghosts/ghost11.png'
import ghost12 from '@/assets/img/ghosts/ghost12.png'
import ghost13 from '@/assets/img/ghosts/ghost13.png'
import ghost14 from '@/assets/img/ghosts/ghost14.png'
import ghost15 from '@/assets/img/ghosts/ghost15.png'
import ghost16 from '@/assets/img/ghosts/ghost16.png'
import ghost17 from '@/assets/img/ghosts/ghost17.png'
import ghost18 from '@/assets/img/ghosts/ghost18.png'
import ghost19 from '@/assets/img/ghosts/ghost19.png'
import ghost20 from '@/assets/img/ghosts/ghost20.png'
import ghost21 from '@/assets/img/ghosts/ghost21.png'

// Ghost images
const ghostImages: string[] = [
    ghost1, ghost2, ghost3, ghost4, ghost5, ghost6, ghost7a, ghost7b, ghost7c, ghost7d, ghost7e, ghost7f, ghost8, ghost9, ghost10,
    ghost11, ghost12, ghost13, ghost14, ghost15, ghost16, ghost17, ghost18, ghost19, ghost20, ghost21
]

// Get ghost image based on settings or random
export default function getGhostImage(index?: number) {
    if (index) { return ghostImages[index] }
    return ghostImages[Math.floor(Math.random() * ghostImages.length)]
}
