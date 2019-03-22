<script>
/**
 * Editor menus
 *
 * @author Bastien Nicoud
 */
import { mapState, mapActions } from 'vuex'

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
    ...mapActions([
      'saveEditorContent',
      'importEditorContent'
    ]),
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
      <!-- SAVE / IMPORT -->
      <div
        v-if="gameLoaded"
        class="control"
        title="Sauvegardez le code dans l'éditeur sur votre ordinateur."
      >
        <button
          class="button is-success"
          @click="saveEditorContent"
        >
          <span class="icon">
            <i class="fas fa-save" />
          </span>
        </button>
      </div>
      <div
        v-if="gameLoaded"
        class="control"
        title="Importez un fichier du language sélectionné."
      >
        <div class="file is-primary">
          <label class="file-label">
            <input
              ref="fileInput"
              class="file-input"
              type="file"
              name="resume"
              @change="importEditorContent($refs.fileInput.files)"
            >
            <span class="file-cta">
              <span class="file-icon">
                <i class="fas fa-upload" />
              </span>
            </span>
          </label>
        </div>
      </div>
      <!-- DISPLAY INSTRUCTION DROPDOWN -->
      <div
        v-if="gameManager && gameManager.provider.gameInstructions"
        class="control"
      >
        <div class="dropdown is-hoverable">
          <div class="dropdown-trigger">
            <button
              class="button"
              aria-haspopup="true"
              aria-controls="dropdown-menu"
            >
              <span>Instructions</span>
              <span class="icon is-small">
                <i
                  class="fas fa-angle-down"
                  aria-hidden="true"
                />
              </span>
            </button>
          </div>
          <div
            id="dropdown-menu"
            class="dropdown-menu"
            role="menu"
          >
            <div class="dropdown-content">
              <a
                v-for="instruction of gameManager.provider.gameInstructions"
                :key="instruction.path"
                :href="gameManager.provider.generateUrl(instruction.path)"
                class="dropdown-item"
                target="_blank"
              >
                {{ instruction.name }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.file-cta {
  padding: 5px 10px !important;
}

.file-icon {
  margin: 0px !important;
}
</style>
