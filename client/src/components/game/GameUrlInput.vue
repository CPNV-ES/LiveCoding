<script>
import { setTimeout } from 'timers';
/**
 * This components display the inputs to load a game from a url
 */
export default {
  data () {
    return {
      loader: false,
      provider: 'github',
      url: ''
    }
  },
  methods: {
    /**
     * Launch the game loading procedure
     */
    load () {
      this.loader = true
      setTimeout(() => {
        this.loader = false
      }, 2000)
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
      <option value="folder">
        Doosier
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
        v-if="loading"
        class="loader-spinner"
      />
      <p v-else>
        Charger
      </p>
    </button>
  </div>
</template>
