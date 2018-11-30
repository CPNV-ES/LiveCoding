<script>
/**
 * This components display the inputs to load a game from a url
 */
export default {
  data () {
    return {
      loader: false
    }
  },
  computed: {
    url: {
      get () {
        return this.$store.state.game.url
      },
      set (v) {
        this.$store.commit('UPDATE_GAME_URL', v)
      }
    },
    provider: {
      get () {
        return this.$store.state.game.provider
      },
      set (v) {
        this.$store.commit('UPDATE_GAME_PROVIDER', v)
      }
    }
  },
  methods: {
    /**
     * Launch the game loading procedure
     */
    async load () {
      this.loader = true
      await this.$store.dispatch('load')
      this.loader = false
    }
  }
}
</script>

<template>
  <div class="nav-right">
    <select
      v-model="provider"
      class="spacing"
    >
      <option value="github">
        GitHub
      </option>
      <option value="url">
        URL
      </option>
    </select>
    <input
      v-model="url"
      class="spacing"
      type="text"
      placeholder="URL du jeux"
    >
    <button
      class="is-blue spacing"
      @click="load()"
    >
      <span
        v-if="loader"
        class="loader-spinner"
      />
      <p v-else>
        Charger
      </p>
    </button>
  </div>
</template>
