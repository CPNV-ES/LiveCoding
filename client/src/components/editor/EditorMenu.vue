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
    }
  },
  methods: {
    openInstruction (uri) {
      window.open(this.gameManager.provider.generateUrl(uri))
    },
    async run () {
      try {
        this.loader = true
        // Launch the process execution, and wait the end the execution
        await this.$store.dispatch('run')
      } catch (e) {
        console.error('Error during process exection')
        this.$snackbar.open({
          message: 'Error during script execution, check console !',
          type: 'is-danger',
          position: 'is-top',
          actionText: 'OK',
          duration: 4500
        })
      } finally {
        this.loader = false
      }
    },
    stop () {
      this.$store.dispatch('stop')
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
      <!-- START THE SCRIPT BUTTON -->
      <div
        class="control"
        :title="gameLoaded ? 'Lancez l\'execution de votre script !' : 'Aucun jeux n\'est chargé !'"
      >
        <button
          class="button is-primary"
          :class="{ 'is-loading': loader }"
          :disabled="!gameLoaded"
          @click="run"
        >
          <span class="icon is-left">
            <i class="fas fa-play" />
          </span>
          <p>Run</p>
        </button>
      </div>
      <!-- STOP SCRIPT EXECUTION IN CASE OF PROBLEM - Showed only when process running -->
      <div
        v-if="loader"
        class="control"
        title="Stoppez l'execution du script"
      >
        <button
          class="button is-danger"
          @click="stop"
        >
          <span class="icon is-left">
            <i class="fas fa-stop" />
          </span>
        </button>
      </div>
    </div>
  </div>
</template>
