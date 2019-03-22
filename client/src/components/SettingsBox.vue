<script>
/**
 * This component is displayed when you open the settings modal
 */
export default {
  computed: {
    processorUrl: {
      get () {
        return this.$store.state.processor.url
      },
      set (v) {
        this.$store.commit('UPDATE_PROCESSOR_URL', v)
      }
    },
    theme: {
      get () {
        return this.$store.state.editor.theme
      },
      set (value) {
        this.$store.commit('UPDATE_EDITOR_THEME', value)
      }
    },
    fontSize: {
      get () {
        return this.$store.state.editor.fontSize
      },
      set (value) {
        this.$store.commit('UPDATE_EDITOR_FONT_SIZE', value)
      }
    }
  }
}
</script>

<template>
  <div
    class="modal-card"
    style="width: auto"
  >
    <header class="modal-card-head">
      <p class="modal-card-title">
        Settings
      </p>
    </header>
    <section class="modal-card-body">
      <div class="field">
        <label class="label">
          Processor endpoint
        </label>
        <div class="control has-icons-left">
          <input
            v-model="processorUrl"
            class="input"
            type="text"
            placeholder="Websocket processor endpoint"
            style="min-width: 60vw;"
          >
          <span class="icon is-small is-left">
            <i class="fas fa-external-link-square-alt" />
          </span>
        </div>
        <p class="help">
          L'url doit être un endpoint websockets : <code>ws://processor.com</code>
        </p>
      </div>

      <div class="field">
        <label class="label">
          Editor theme
        </label>
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
      </div>

      <div class="field">
        <label class="label">
          Processor endpoint
        </label>
        <div class="control has-icons-left">
          <div class="select">
            <select v-model="fontSize">
              <option value="10">
                10
              </option>
              <option value="12">
                12
              </option>
              <option value="14">
                14
              </option>
              <option value="16">
                16
              </option>
              <option value="18">
                18
              </option>
              <option value="20">
                20
              </option>
              <option value="22">
                22
              </option>
              <option value="28">
                28
              </option>
              <option value="36">
                36
              </option>
            </select>
          </div>
          <div class="icon is-small is-left">
            <i class="fas fa-font" />
          </div>
        </div>
        <p class="help">
          Changez la taille de la police de l'éditeur.
        </p>
      </div>
    </section>
    <footer class="modal-card-foot">
      <button
        class="button is-primary"
        @click="$parent.close()"
      >
        OK
      </button>
    </footer>
  </div>
</template>
