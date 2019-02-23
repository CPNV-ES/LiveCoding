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
  <nav
    id="navbar"
    class="navbar"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="navbar-menu">
      <div class="navbar-start">
        <EditorMenu />
        <div class="navbar-item">
          <h1 class="title is-5">
            LiveCoding{{ gameLoaded ? ` - ${gameManager.provider.gameName}` : '' }}
          </h1>
        </div>
      </div>

      <div class="navbar-end">
        <GameUrlInput />
      </div>
    </div>
  </nav>
</template>
