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
      v-if="gameLoaded"
      v-model="language"
      class="spacing"
    >
      <!-- DISPLAY THE INTERPRETERS SUPPORTED BY THE GAME -->
      <option
        v-for="(lang, index) in gameManager.provider.gameInterpreters"
        :key="index"
        :value="index"
      >
        {{ index }}
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
    <!-- LAUNCH THE EXECUTION OF THE SCRIPT -->
    <button
      class="is-blue spacing"
      title="Lancez l'execution de votre script !"
    >
      Run
    </button>
    <span
      v-if="gameLoaded"
    >
      <button
        v-for="(instruction, index) of gameManager.provider.gameInstructions"
        :key="index"
        class="spacing"
        :title="instruction.description"
      >
        {{ instruction.name }}
      </button>
    </span>
  </div>
</template>
