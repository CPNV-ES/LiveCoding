<script>
/**
 * Editor component
 *
 * @author Bastien Nicoud
 */
import * as monaco from 'monaco-editor'

export default {
  data () {
    return {
      editor_content: `console.log('tutu')`
    }
  },
  mounted () {
    monaco.editor.create(document.getElementById('editor-box'), {
      value: this.editor_content,
      theme: 'vs-dark',
      language: 'javascript'
    })
  }
}
</script>

<template>
  <div id="editor-box" />
</template>
