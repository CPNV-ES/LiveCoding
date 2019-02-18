<script>
/**
 * Editor menus
 *
 * @author Bastien Nicoud
 */
import { mapState } from 'vuex'

export default {
  data () {
    return {
      loader: false
    }
  },
  computed: {
    ...mapState({
      gameLoaded: state => state.game.loaded,
      gameManager: state => state.game.manager,
      gameUrl: state => state.game.url
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
  },
  methods: {
    openInstruction (uri) {
      window.open(this.gameManager.provider.generateUrl(uri))
    },
    run () {
      this.$store.dispatch('run')
    }
  }
}
</script>

<template>
  <div class="navbar-item">
    <div class="field is-grouped">
      <p
        v-if="gameLoaded"
        class="control has-icons-left"
      >
        <span class="select">
          <!-- LANGUAGES LIST -->
          <select
            v-model="language"
            class="spacing"
          >
            <option
              v-for="(lang, index) in gameManager.provider.gameInterpreters"
              :key="index"
              :value="index"
            >
              {{ index }}
            </option>
          </select>
        </span>
        <span class="icon is-left">
          <i class="fas fa-terminal" />
        </span>
      </p>
      <p class="control has-icons-left">
        <span class="select">
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
        </span>
        <span class="icon is-left">
          <i class="fas fa-palette" />
        </span>
      </p>
      <div
        class="control"
        title="Lancez l'execution de votre script !"
        @click="run"
      >
        <button
          class="button is-primary"
          :class="{ 'is-loading': loader }"
        >
          <span class="icon is-left">
            <i class="fas fa-play" />
          </span>
          <p>Run</p>
        </button>
      </div>
    </div>
  </div>
</template>
