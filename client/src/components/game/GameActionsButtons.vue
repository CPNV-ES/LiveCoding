<script>
import GameSettingsBox from '@/components/game/GameSettingsBox'
import { mapState } from 'vuex'

/**
 * This components display the inputs to load a game from a url
 */
export default {
  computed: {
    ...mapState({
      loading: state => state.game.loading,
      running: state => state.processor.running
    })
  },
  methods: {
    /**
     * Launch the game loading procedure
     */
    async reload () {
      try {
        await this.$store.dispatch('load')
        this.$snackbar.open({
          message: 'Game reloaded, ready !',
          type: 'is-success',
          position: 'is-top',
          actionText: 'OK',
          duration: 3000
        })
      } catch {
        this.$snackbar.open({
          message: 'Error during game loading, see console for details',
          type: 'is-danger',
          position: 'is-top',
          actionText: 'OK',
          duration: 4500
        })
      }
    },
    /**
     * Displays the settings modal
     */
    openGameSettingsModal () {
      this.$modal.open({
        parent: this,
        component: GameSettingsBox,
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
          class="button is-warning"
          :class="{ 'is-loading': loading }"
          :disabled="running || loading"
          @click="reload()"
        >
          <span class="icon is-left">
            <i class="fas fa-redo-alt" />
          </span>
        </button>
      </div>
      <div class="control">
        <button
          class="button is-primary"
          @click="openGameSettingsModal()"
        >
          Jeux
        </button>
      </div>
    </div>
  </div>
</template>
