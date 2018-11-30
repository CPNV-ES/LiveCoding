<script>
/**
 * Editor component
 *
 * @author Bastien Nicoud
 */
import * as monaco from 'monaco-editor'
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      language: state => state.editor.language,
      theme: state => state.editor.theme
    }),
    /**
     * Get and set the store with the current editor state
     */
    value: {
      get () {
        return this.$store.state.editor.value
      },
      set (value) {
        this.$store.commit('UPDATE_EDITOR_VALUE', value)
      }
    }
  },
  watch: {
    // Language change
    language (newVal) {
      if (this.monaco) {
        window.monaco.editor.setModelLanguage(this.monaco.getModel(), newVal)
      }
    },
    // Theme change
    theme (newVal) {
      if (this.monaco) {
        window.monaco.editor.setTheme(newVal)
      }
    }
  },
  /**
   * When the component is mounted
   */
  mounted () {
    this.initEditor(monaco)
  },
  beforeDestroy () {
    /**
     * Unmount the editor when the component is destroyed
     */
    this.editor && this.editor.dispose()
  },
  methods: {
    /**
     * Launch the code editor (left side of the page)
     */
    initEditor (monaco) {
      // Editor base options
      const options = {
        value: this.value,
        theme: this.theme,
        language: this.language,
        fontSize: 16,
        minimap: {
          enabled: false
        }
      }
      // Create the editor with default option
      this.monaco = monaco.editor.create(document.getElementById('editor-box'), options)
      /**
       * Register observers on the editor
       */
      this.monaco.onDidChangeModelContent(event => {
        // Get the current content of the editor
        let value = this.monaco.getValue()
        if (this.value !== value) {
          this.value = value
        }
      })
    }
  }
}
</script>

<template>
  <div id="editor-box" />
</template>
