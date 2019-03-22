<script>
import { mapState, mapGetters } from 'vuex'

/**
 * This component is displayed when you open the settings modal
 */
export default {
  computed: {
    ...mapState({
      loading: state => state.game.loading
    }),
    ...mapGetters({
      shareUrl: 'shareUrl'
    }),
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
      try {
        await this.$store.dispatch('load')
        this.$snackbar.open({
          message: 'Game loaded, ready !',
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
    copyToClipboard () {
      let copyText = this.$refs.copyTextToClipboard
      copyText.select()
      document.execCommand('copy')
      this.$snackbar.open({
        message: 'Lien de partage copié !',
        type: 'is-success',
        position: 'is-top',
        actionText: 'OK',
        duration: 3000
      })
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
        Paramètres du jeux
      </p>
    </header>
    <section class="modal-card-body">
      <!-- GAME URL -->
      <div class="field">
        <label class="label">
          Source du jeux
        </label>
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
              style="min-width: 400px;"
            >
            <span class="icon is-small is-left">
              <i class="fas fa-link" />
            </span>
          </p>
          <p class="control">
            <button
              class="button is-primary"
              :disabled="loading"
              :class="{ 'is-loading': loading }"
              @click="load()"
            >
              Load
            </button>
          </p>
        </div>
        <p class="help">
          Séléctionnez la source du jeux (GitHub, URL).<br>
          Puis entrez l'adresse du jeux au bon format :<br>
          <strong>GitHub</strong> : <code>UTILISATEUR</code> / <code>DEPOT</code> @ <code>BRANCHE | TAG</code><br>
          <strong>URL</strong> : <code>http://mon-nom-de-deomaine.com/chemin</code>
        </p>
      </div>
      <!-- SHARE LINK -->
      <div class="field">
        <label class="label">
          Lien de partage
        </label>
        <div class="field has-addons">
          <p class="control has-icons-left is-expanded">
            <input
              ref="copyTextToClipboard"
              :value="shareUrl"
              class="input"
              type="text"
              placeholder="URL du jeux"
            >
            <span class="icon is-small is-left">
              <i class="fas fa-share-square" />
            </span>
          </p>
          <p class="control">
            <button
              class="button is-link"
              @click="copyToClipboard"
            >
              <span class="icon is-small is-left">
                <i class="fas fa-copy" />
              </span>
            </button>
          </p>
        </div>
        <p class="help">
          Copiez cet url et partagez le, il permet d'ouvrir LiveCoding directement avec le jeux actuel.
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
