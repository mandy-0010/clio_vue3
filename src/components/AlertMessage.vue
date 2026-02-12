<template>
  <div class="message-alert">
    <div
      class="alert alert-dismissible"
      :class="'alert-' + item.status"
      v-for="(item, index) in messages"
      :key="index"
    >
      {{ item.message }}
      <button type="button" class="close" aria-label="Close" @click="removeMessage(index)">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import Alert from '@/components/AlertMessage.vue'

const status = statusStore()
const { messages } = storeToRefs(status)
const { updateMessage } = status
const { removeMessage } = status
</script>

<style scope>
.message-alert {
  max-width: 55%;
  position: fixed;
  top: 56px;
  right: 20px;
  z-index: 1100;
}
</style>
