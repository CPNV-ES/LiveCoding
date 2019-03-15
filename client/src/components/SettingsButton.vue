<script>
import ParametersBox from '@/components/ParametersBox'

/**
 * This components display the inputs to load a game from a url
 */
export default {
  methods: {
    /**
     * Displays the settings modal
     */
    openSettingsModal () {
      this.$modal.open({
        parent: this,
        component: ParametersBox,
        hasModalCard: true
      })
    }
  }
}
</script>

<template>
  <div class="navbar-item">
    <div class="field is-grouped">
      <div class="control">
        <button
          class="button is-primary"
          @click="openSettingsModal()"
        >
          Settings
        </button>
      </div>
    </div>
  </div>
</template>
