<script>
/**
 * NavBar
 *
 * @author Bastien Nicoud
 */
import EditorMenu from '@/components/editor/EditorMenu'
import GameActionsButtons from '@/components/game/GameActionsButtons'
import SettingsButton from '@/components/SettingsButton'
import { mapState } from 'vuex'

export default {
  components: {
    GameActionsButtons,
    EditorMenu,
    SettingsButton
  },
  data () {
    return {
      toggle_burger: false
    }
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
    <div class="navbar-brand">
      <EditorMenu />
      <div class="navbar-item">
        <h1 class="title is-5">
          LiveCoding{{ gameLoaded ? ` - ${gameManager.provider.gameName}` : '' }}
        </h1>
      </div>
      <!-- Burger for little screens -->
      <a
        role="button"
        class="navbar-burger burger"
        :class="{ 'is-active': toggle_burger }"
        data-target="navMenu"
        aria-label="menu"
        aria-expanded="false"
        @click="toggle_burger = !toggle_burger"
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </a>
    </div>

    <div
      class="navbar-menu"
      :class="{ 'is-active': toggle_burger }"
    >
      <div class="navbar-end">
        <GameActionsButtons />
        <SettingsButton />
      </div>
    </div>
  </nav>
</template>
