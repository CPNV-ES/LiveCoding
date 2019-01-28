<script>
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
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-body">
            <p>
              Modifiez l'url du processor.
              L'url doit être un endpoint websockets : <code>ws://processor.com</code>
            </p>
          </div>
          <div class="modal-body">
            <input
              v-model="processorUrl"
              class="full-width"
              type="text"
              placeholder="URL du processor"
            >
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button
                class="is-blue"
                @click="$store.commit('SHOW_APP_PARAMETERS_MODAL', false)"
              >
                Fermer
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
