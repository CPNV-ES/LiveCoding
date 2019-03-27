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
    this.$store.dispatch('console/info', 'Game box mounted, ready to load game !')
    // If query parametrs, tell the user if he wants to load query parameters game
    let url = new URL(window.location.href)
    let query = new URLSearchParams(url.search)
    if (query.has('provider')) {
      // load the game
      this.$store.commit('UPDATE_GAME_PROVIDER', query.get('provider'))
      this.$store.commit('UPDATE_GAME_URL', `${query.get('repo')}@${query.get('version')}`)
    }
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
  <div id="game-box" />
</template>
