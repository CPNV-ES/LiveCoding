<script>
import NavBar from '@/components/NavBar'
import EditorBox from '@/components/editor/EditorBox'
import GameBox from '@/components/game/GameBox'
import ConsoleBox from '@/components/console/ConsoleBox'
/**
 * Base Vue component
 */
export default {
  components: {
    NavBar,
    EditorBox,
    GameBox,
    ConsoleBox
  }
}
</script>

<template>
  <div id="app">
    <NavBar />
    <EditorBox />
    <GameBox />
    <ConsoleBox />
  </div>
</template>
