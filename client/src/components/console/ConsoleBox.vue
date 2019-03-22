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
  },
  updated () {
    this.$nextTick(() => this.scrollToEnd())
  },
  methods: {
    scrollToEnd: function () {
      // scroll to the start of the last message
      this.$el.scrollTop = this.$el.lastElementChild.offsetTop
    }
  }
}
</script>

<template>
  <div id="console-box">
    <div
      v-for="message in messages"
      :key="message.id"
      class="c-message"
      :class="message.type"
    >
      <span>
        [{{ message.time.getHours() }}:{{ message.time.getMinutes() }}:{{ message.time.getSeconds() }}]
      </span>
      <span>
        {{ message.text }}
      </span>
    </div>
  </div>
</template>
