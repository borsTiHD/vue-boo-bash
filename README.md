# VueBooBash

VueBooBash is a lightweight and straightforward game that can be seamlessly integrated as an easter egg into your projects. It features a simple ghost animation that spawns and moves around the screen.

## Download

VueBooBash is available on [npm](https://www.npmjs.com/package/vue-boo-bash). You can install it using npm, yarn, or pnpm:

```bash
# Using npm
npm install vue-boo-bash

# Using yarn
yarn add vue-boo-bash

# Using pnpm
pnpm add vue-boo-bash
```

## Usage

To incorporate VueBooBash into your project, import the BooBash component and its accompanying CSS styles:

```javascript
<script setup lang="ts">
import { BooBash } from 'vue-boo-bash'
import 'vue-boo-bash/style.css'
</script>

<template>
    <!-- Simplest configuration -->
    <BooBash />
</template>
```

## Customization
You can customize the scoreboard and game-over screen by utilizing optional slots:

```javascript
<template>
    <BooBash>
        <!-- Scoreboard slot is optional -->
        <template #scoreboard="{ score, time, running }">
            <div v-if="running" class="own-styling">
                <h1>Scoreboard</h1>
                <p>Your score: {{ score }}</p>
                <p>Time left: {{ time }}</p>
            </div>
        </template>

        <!-- Game Over slot is optional -->
        <template #gameOver="{ score, highScore, show, closeGameOver }">
            <div v-if="show" class="own-styling">
                <h1>Game Over</h1>
                <p>Your score: {{ score }}</p>
                <p>High Score: {{ highScore }}</p>

                <button @click="closeGameOver">Close</button>
            </div>
        </template>
    </BooBash>
</template>
```

## Optional Settings
You can tweak game settings using an optional reactive settings object:

```javascript
<script setup lang="ts">
import { ref } from 'vue'
import BackgroundMusic from '@/assets/my_music.mp3'
...

// Optional and reactive game settings
// On change, the game will immediately update
const settings = ref({
    maxGameTime: 30, // Default: 30 seconds
    maxGhosts: 10, // Default: 10 ghosts
    spawnDuration: 2000, // Default: 2000 ms
    music: BackgroundMusic, // Background music source
    debug: true // Display destination boxes on ghosts (for debugging)
})
</script>

<template>
    <BooBash :settings="settings" />
</template>
```

## Optional Events
You can listen for various events such as `new-game` and `game-over`:

```javascript
<script setup lang="ts">
...

// Event handler for a new game
const newGame = () => {
    console.log('New game')
}

// Event handler for game over
const gameOver = (event: { score: number; highScore: number }) => {
    console.log('Game over', event)
}
</script>

<template>
    <BooBash @new-game="newGame" @game-over="gameOver" />
</template>
```

## Credits
- Background music: [Super Mario World - Ghost House Orchestral Cover](https://www.youtube.com/watch?v=nGPxmI2Ld9k)  
- Hit sound: [SMW Kick Sound Effect](http://soundfxcenter.com/download-sound/smw-kick-sound-effect/)  
- Ghost images created with the assistance of [Microsoft Designer](https://designer.microsoft.com/image-creator)  

Feel free to adjust any details according to your preferences or specific requirements.
