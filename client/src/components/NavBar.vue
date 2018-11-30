<script>
/**
 * NavBar
 *
 * @author Bastien Nicoud
 */
import GameUrlInput from '@/components/game/GameUrlInput'

export default {
  components: {
    GameUrlInput
  },
  computed: {
    language: {
      get () {
        return this.$store.state.editor.language
      },
      set (value) {
        this.$store.commit('UPDATE_EDITOR_LANGUAGE', value)
      }
    },
    theme: {
      get () {
        return this.$store.state.editor.theme
      },
      set (value) {
        this.$store.commit('UPDATE_EDITOR_THEME', value)
      }
    }
  }
}
</script>

<template>
  <nav id="nav-bar">
    <div class="nav-left">
      <select
        v-model="language"
        class="spacing"
      >
        <option value="javascript">
          JavaScript
        </option>
        <option value="ruby">
          Ruby
        </option>
        <option value="python">
          Python
        </option>
        <option value="php">
          PHP
        </option>
      </select>
      <select
        v-model="theme"
        class="spacing"
      >
        <option value="vs">
          Light
        </option>
        <option value="vs-dark">
          Dark
        </option>
        <option value="solarized-dark">
          Solarized Dark
        </option>
        <option value="cobalt">
          Cobalt
        </option>
      </select>
      <button class="is-blue spacing">
        Run
      </button>
    </div>
    <div class="nav-center">
      <h1>LiveCoding</h1>
    </div>
    <GameUrlInput />
  </nav>
</template>
