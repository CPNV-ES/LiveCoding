<script>
/**
 * NavBar
 *
 * @author Bastien Nicoud
 */
import GameUrlInput from '@/components/game/GameUrlInput'
import { mapState } from 'vuex'

export default {
  components: {
    GameUrlInput
  },
  computed: {
    ...mapState({
      gameLoaded: state => state.game.loaded,
      gameManager: state => state.game.manager
    }),
    language: {
      get () {
        return this.$store.state.editor.language
      },
      set (value) {
        this.$store.commit('UPDATE_EDITOR_LANGUAGE', value)
      }
    },
    theme: {
      get () {
        return this.$store.state.editor.theme
      },
      set (value) {
        this.$store.commit('UPDATE_EDITOR_THEME', value)
      }
    }
  }
}
</script>

<template>
  <nav id="nav-bar">
    <div class="nav-left">
      <select
        v-model="language"
        class="spacing"
      >
        <!-- DISPLAY THE INTERPRETERS SUPPORTED BY THE GAME -->
        <option
          v-for="lang in gameManager.provider.gameInterpreters"
          :key="lang"
          value="lang"
        >
          {{ lang }}
        </option>
      </select>
      <!-- SELECT COLOR THEME -->
      <select
        v-model="theme"
        class="spacing"
      >
        <option value="vs">
          Light
        </option>
        <option value="vs-dark">
          Dark
        </option>
        <option value="solarized-dark">
          Solarized Dark
        </option>
        <option value="cobalt">
          Cobalt
        </option>
      </select>
      <button class="is-blue spacing">
        Run
      </button>
    </div>
    <div class="nav-center">
      <h1>LiveCoding{{ gameLoaded ? ` - ${gameManager.provider.gameName}` : '' }}</h1>
    </div>
    <GameUrlInput />
  </nav>
</template>
