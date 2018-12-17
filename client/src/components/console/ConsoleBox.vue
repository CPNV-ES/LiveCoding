<script>
/**
 * Game console
 *
 * @author Bastien Nicoud
 */
import { mapState, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapState({
      messages: state => state.console.messages
    })
  },
  methods: {
    ...mapMutations({
      msg: 'NEW_MESSAGE'
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
      :class="message.type"
    >
      <span>
        [{{ message.time.getHours() }}:{{ message.time.getMinutes() }}]
      </span>
      <span>
        {{ message.content }}
      </span>
    </div>
  </div>
</template>
