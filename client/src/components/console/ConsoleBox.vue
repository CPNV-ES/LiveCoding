<script>
/**
 * Game console
 *
 * @author Bastien Nicoud
 */
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      messages: state => state.console.messages
    })
  }
}
</script>

<template>
  <div id="console-box">
    <div
      v-for="message in messages"
      :key="message.id"
      class="message"
    >
      <span :class="message.type">
        {{ message.content }}
      </span>
    </div>
  </div>
</template>
