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
  },
  methods: {
    ...mapActions({
      loadGame: 'load'
    })
  }
}
</script>

<template>
  <div id="game-box">
    Game
  </div>
</template>
