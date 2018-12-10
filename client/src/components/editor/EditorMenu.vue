<script>
/**
 * Editor menus
 *
 * @author Bastien Nicoud
 */
import { mapState } from 'vuex'

export default {
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
  <div class="nav-left">
    <!-- LANGUAGES LIST -->
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
</template>
