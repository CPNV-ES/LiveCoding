<script>
/**
 * NavBar
 *
 * @author Bastien Nicoud
 */
import GameUrlInput from '@/components/game/GameUrlInput'
import EditorMenu from '@/components/editor/EditorMenu'
import { mapState } from 'vuex'

export default {
  components: {
    GameUrlInput,
    EditorMenu
  },
  computed: {
    ...mapState({
      gameLoaded: state => state.game.loaded,
      gameManager: state => state.game.manager
    })
  }
}
</script>

<template>
  <nav id="nav-bar">
    <!-- EDITOR MENU - LANG SELECTION - THEME -->
    <EditorMenu />
    <!-- APP NAME AND GAME NAME -->
    <div class="nav-center">
      <h1>LiveCoding{{ gameLoaded ? ` - ${gameManager.provider.gameName}` : '' }}</h1>
    </div>
    <!-- GAME LOADING INPUTS -->
    <GameUrlInput />
  </nav>
</template>
