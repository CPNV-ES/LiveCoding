<script>
import NavBar from '@/components/NavBar'
import EditorBox from '@/components/editor/EditorBox'
import GameBox from '@/components/game/GameBox'
import ConsoleBox from '@/components/console/ConsoleBox'
import AppParametersModal from '@/components/game/AppParametersModal'
import { mapState } from 'vuex'
/**
 * Base Vue component
 */
export default {
  components: {
    NavBar,
    EditorBox,
    GameBox,
    ConsoleBox,
    AppParametersModal
  },
  computed: {
    ...mapState({
      showAppParametersModal: state => state.showAppParametersModal
    })
  }
}
</script>

<template>
  <div id="app">
    <NavBar />
    <EditorBox />
    <GameBox />
    <ConsoleBox />
    <AppParametersModal v-if="showAppParametersModal" />
  </div>
</template>
