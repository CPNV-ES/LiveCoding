<script>
export default {
  data () {
    return {
      language: 'php'
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
      <select class="spacing">
        <option value="Tutu">
          Light
        </option>
        <option value="Tutu">
          Dark
        </option>
      </select>
      <button class="is-blue spacing">
        Run
      </button>
    </div>
    <div class="nav-center">
      <h1>LiveCoding</h1>
    </div>
    <div class="nav-right">
      <select class="spacing">
        <option value="Tutu">GitHub</option>
        <option value="Tutu">Doosier</option>
      </select>
      <input
        class="spacing"
        type="text"
        placeholder="URL du jeux"
      >
      <button class="is-blue spacing">
        Charger
      </button>
    </div>
  </nav>
</template>
