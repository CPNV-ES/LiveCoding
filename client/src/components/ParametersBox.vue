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
