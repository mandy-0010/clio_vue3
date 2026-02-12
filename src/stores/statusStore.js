import { defineStore } from 'pinia'

export const useStatusStore = defineStore('statusStore', {
  state: () => ({
    isLoading: false,
    pagination: {},
    messages: [],
  }),

  actions: {
    updateMessage({ message, status }) {
      const timestamp = Math.floor(Date.now() / 1000)
      this.messages.push({ message, status, timestamp })
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
