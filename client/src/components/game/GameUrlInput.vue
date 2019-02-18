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
  <div class="navbar-item">
    <div class="field is-grouped">
      <div class="control">
        <div class="field has-addons">
          <p class="control">
            <span class="select">
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
            </span>
          </p>
          <p class="control has-icons-left">
            <input
              v-model="url"
              class="input"
              type="text"
              placeholder="URL du jeux"
              style="min-width: 300px;"
            >
            <span class="icon is-small is-left">
              <i class="fas fa-link" />
            </span>
          </p>
          <p class="control">
            <button
              class="button is-primary"
              :class="{ 'is-loading': loader }"
              @click="load()"
            >
              Load
            </button>
          </p>
        </div>
      </div>
      <div class="control">
        <button
          class="button is-primary"
          @click="$store.commit('SHOW_APP_PARAMETERS_MODAL', true)"
        >
          Settings
        </button>
      </div>
    </div>
  </div>
</template>
