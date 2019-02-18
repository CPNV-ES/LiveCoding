<script>
/**
 * Editor component
 *
 * @author Bastien Nicoud
 */
import * as monaco from 'monaco-editor'
import SolarizedDark from 'monaco-themes/themes/Solarized-dark.json'
import Cobalt from 'monaco-themes/themes/Cobalt.json'
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      language: state => state.editor.language,
      theme: state => state.editor.theme,
      fontSize: state => state.editor.fontSize
    }),
    /**
     * Get and set the store with the current editor state
     */
    editorContent: {
      get () {
        return this.$store.getters.editorContent
      },
      set (value) {
        this.$store.commit('UPDATE_EDITOR_CONTENT', value)
      }
    }
  },
  watch: {
    // Language change
    language (newVal) {
      if (this.monaco) {
        window.monaco.editor.setModelLanguage(this.monaco.getModel(), newVal)
        this.monaco.getModel().setValue(this.editorContent)
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
    this.initEditor()
  },
  /**
   * When the component is destoyed
   */
  beforeDestroy () {
    // Unmount the editor when the component is destroyed
    this.editor && this.editor.dispose()
  },
  methods: {
    /**
     * Launch the code editor (left side of the page)
     */
    initEditor () {
      // Editor base options
      const options = {
        value: this.editorContent,
        theme: this.theme,
        language: this.language,
        fontSize: this.fontSize,
        fontFamily: 'IBM Plex Mono',
        minimap: {
          enabled: false
        }
      }
      // Import two themes
      monaco.editor.defineTheme('solarized-dark', SolarizedDark)
      monaco.editor.defineTheme('cobalt', Cobalt)
      // Create the editor with default option
      this.monaco = monaco.editor.create(document.getElementById('editor-box'), options)
      /**
       * Register observers on the editor
       */
      this.monaco.onDidChangeModelContent(event => {
        // Get the current content of the editor
        let value = this.monaco.getValue()
        if (this.editorContent !== value) {
          this.editorContent = value
        }
      })
    }
  }
}
</script>

<template>
  <div id="editor-box" />
</template>
