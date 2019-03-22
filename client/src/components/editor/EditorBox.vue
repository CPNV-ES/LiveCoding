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
  data () {
    return {
      monaco: null
    }
  },
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
      if (window.scriptEditor) {
        window.monaco.editor.setModelLanguage(window.scriptEditor.getModel(), newVal)
        window.scriptEditor.getModel().setValue(this.editorContent)
      }
    },
    // Theme change
    theme (newVal) {
      if (window.scriptEditor) {
        window.monaco.editor.setTheme(newVal)
      }
    },
    // Theme change
    fontSize (newVal) {
      if (window.scriptEditor) {
        window.scriptEditor.updateOptions({ fontSize: newVal })
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
        automaticLayout: true,
        minimap: {
          enabled: false
        }
      }
      // Import two themes
      monaco.editor.defineTheme('solarized-dark', SolarizedDark)
      monaco.editor.defineTheme('cobalt', Cobalt)
      // Create the editor with default option
      window.scriptEditor = monaco.editor.create(document.getElementById('editor-box'), options)
      /**
       * Register observers on the editor
       */
      window.scriptEditor.onDidChangeModelContent(event => {
        // Get the current content of the editor
        let value = window.scriptEditor.getValue()
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
