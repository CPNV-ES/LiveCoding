<script>
import NavBar from '@/components/NavBar'
/**
 * Base Vue component
 */
export default {
  components: {
    NavBar
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
