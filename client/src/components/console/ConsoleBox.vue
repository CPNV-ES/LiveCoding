<script>
/**
 * Game console
 *
 * @author Bastien Nicoud
 */
import { mapState, mapMutations } from 'vuex'
import { setTimeout } from 'timers'

export default {
  computed: {
    ...mapState({
      messages: state => state.console.messages
    })
  },
  mounted () {
    setTimeout(() => this.msg({ id: 4, content: 'tutu', type: 'log', time: new Date() }), 1000)
    setTimeout(() => this.msg({ id: 5, content: 'ATTENTION !', type: 'warning', time: new Date() }), 2000)
    setTimeout(() => this.msg({ id: 6, content: 'Une tres grosse erreur', type: 'error', time: new Date() }), 4000)
    setTimeout(() => this.msg({ id: 7, content: 'Coucou', type: 'info', time: new Date() }), 5000)
    setTimeout(() => this.msg({ id: 8, content: 'Coucou', type: 'info', time: new Date() }), 6000)
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
