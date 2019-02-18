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
