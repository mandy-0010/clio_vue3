import { defineStore } from 'pinia'

export default defineStore('statusStore', {
  state: () => ({
    isLoading: false,
    pagination: {},
    messages: [],
  }),

  actions: {
    updateMessage({ message, status }) {
      const timestamp = Math.floor(Date.now() / 1000)
      const msg = {
        message,
        status,
        timestamp,
      }

      this.messages.push(msg)
      this.removeMessageWithTiming(timestamp)
    },

    removeMessage(index) {
      this.messages.splice(index, 1)
    },

    removeMessageWithTiming(timestamp) {
      setTimeout(() => {
        this.messages = this.messages.filter((msg) => msg.timestamp !== timestamp)
      }, 1500)
    },
  },
})
