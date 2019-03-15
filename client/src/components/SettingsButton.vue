<script>
import SettingsBox from '@/components/SettingsBox'

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
        component: SettingsBox,
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
          Paramètres
        </button>
      </div>
    </div>
  </div>
</template>
