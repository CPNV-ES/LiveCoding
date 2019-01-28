<script>
import { mapActions, mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      gameLoaded: state => state.game.loaded
    })
  },
  mounted () {
    // When the box for the game is mounted, we can load the default game
    this.loadGame()
    this.$store.dispatch('console/info', 'Game box mounted, ready to load game !')
  },
  methods: {
    ...mapActions({
      loadGame: 'load'
    })
  }
}
</script>

<template>
  <div id="game-box" />
</template>
