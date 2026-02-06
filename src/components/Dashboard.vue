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
  import { storeToRefs } from 'pinia';
  import Sidebar from '@/components/Sidebar';
  import Navbar from '@/components/Navbar';
  import Alert from '@/components/AlertMessage';
  import  statusStore from '../stores/statusStore';

components: {  Sidebar,Navbar,AlertMessage }

const status=statusStore();
const {isLoading}=storeToRefs(status);
const {messages}=storeToRefs(status);

created(){
   const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
   this.$http.defaults.headers.common.Authorization = `${token}`;


 };
</script>
