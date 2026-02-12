<template>
  <div>
    <Navbar />
    <Alert></Alert>
    <div class="container-fluid">
      <div class="row">
        <Sidebar></Sidebar>
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import Sidebar from '@/components/Sidebar.vue'
import Navbar from '@/components/Navbar.vue'
import Alert from '@/components/AlertMessage.vue'
// 🔴 修改點：具名 import
import { useStatusStore } from '@/stores/statusStore'
import axios from 'axios'

const status = useStatusStore() // 🔴 不要在 import 頂層呼叫
const { isLoading } = storeToRefs(status)
const { messages } = storeToRefs(status)

onMounted(() => {
  const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
  // 假設你有 axios 實例
  // 例如 import axios from '@/http' 或 this.$http 改成 axios
  axios.defaults.headers.common.Authorization = `${token}`
})
</script>
