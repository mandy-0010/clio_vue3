<template>
  <div class="container">
    <!-- Alert -->
    <Alert />

    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light mt-4 text-right">
      <a href="#" class="font-italic text-dbrown text-decoration-none">
        <h3>CLio ACcessory</h3>
      </a>
      <button
        class="navbar-toggler ml-auto"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ml-4">
          <li class="nav-item active">
            <router-link to="/Jindex" class="nav-link text-dbrown">Home/首頁</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/Productlist" class="nav-link text-dbrown">Products/商品</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/About" class="nav-link text-dbrown">About/關於</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/Contact" class="nav-link text-dbrown">Contact/聯絡</router-link>
          </li>
        </ul>

        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link to="/Login" class="nav-link text-dbrown">
              <span class="material-icons"> account_circle</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/Checkout" class="nav-link text-dbrown">
              <span class="material-icons"> shopping_cart</span>
              <span>({{ cart.carts.length }})</span>
            </router-link>
          </li>
          <li class="nav-item">
            <div class="dropdown">
              <a
                class="btn text-dbrown px-0"
                href="#"
                role="button"
                data-toggle="dropdown"
                aria-expanded="false"
              >
                <span class="material-icons"> favorite</span>
                <span>({{ favoritesLength }})</span>
              </a>
              <div class="dropdown-menu dropdown-menu-right">
                <h5 class="text-center py-2">我的最愛</h5>
                <table class="table">
                  <tbody>
                    <tr v-for="item in favorites" :key="item.id">
                      <td class="text-center">
                        <button
                          class="btn btn-sm text-danger p-0"
                          @click.prevent="removeFavoriteItem(item)"
                        >
                          <i class="fas fa-times"></i>
                        </button>
                      </td>
                      <td class="text-center">{{ item.title }}</td>
                      <td class="text-center">
                        <button class="btn btn-sm text-dbrown" @click="addFavoriteItem(item)">
                          <span class="material-icons"> shopping_cart</span>
                        </button>
                      </td>
                    </tr>
                    <tr v-if="favorites.length === 0">
                      <td colspan="3" class="text-center">我的最愛是空的</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </nav>

    <!-- Checkout Section -->
    <section class="mt-5">
      <div class="row">
        <!-- Cart Info -->
        <div class="col-md-6">
          <h5 class="bg-dbrown text-white py-2 text-center">訂單資訊</h5>
          <table class="table mt-3">
            <thead>
              <tr>
                <th></th>
                <th>商品資料</th>
                <th>數量</th>
                <th>價格</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in cart.carts" :key="item.id">
                <td>
                  <div
                    style="
                      width: 50px;
                      height: 50px;
                      background-size: cover;
                      background-position: center;
                    "
                    :style="{ backgroundImage: `url(${item.product.imageUrl})` }"
                  ></div>
                </td>
                <td>{{ item.product.title }}</td>
                <td>{{ item.qty }}{{ item.product.unit }}</td>
                <td>${{ item.final_total }}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="3" class="text-right">總計</td>
                <td>${{ cart.total }}</td>
              </tr>
              <tr v-if="cart.final_total !== cart.total">
                <td colspan="3" class="text-right text-danger">折扣價</td>
                <td class="text-danger">${{ cart.final_total }}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <!-- Customer Info Form -->
        <div class="col-md-6">
          <h5 class="bg-dbrown text-white py-2 text-center">顧客資訊</h5>
          <form @submit.prevent="submitForm" class="mt-3">
            <div class="form-group">
              <label>Email</label>
              <input type="email" v-model="form.user.email" class="form-control" required />
            </div>
            <div class="form-group">
              <label>姓名</label>
              <input type="text" v-model="form.user.name" class="form-control" required />
            </div>
            <div class="form-group">
              <label>電話</label>
              <input type="text" v-model="form.user.tel" class="form-control" required />
            </div>
            <div class="form-group">
              <label>地址</label>
              <input type="text" v-model="form.user.address" class="form-control" required />
            </div>
            <button type="submit" class="btn btn-dbrown text-white mt-2">送出表單</button>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import $ from 'jquery'
import { storeToRefs } from 'pinia'

import statusStore from '@/stores/statusStore'
import productStore from '@/stores/productStore'
import favoriteStore from '@/stores/favoriteStore'

import Alert from '@/components/AlertMessage.vue'

// ----------------------
// Pinia stores
// ----------------------
const status = statusStore()
const productStoreRef = productStore()
const favorite = favoriteStore()

const { products } = storeToRefs(productStoreRef)
const { messages, isLoading } = storeToRefs(status)

// ----------------------
// Form
// ----------------------
const form = ref({
  user: {
    name: '',
    email: '',
    tel: '',
    address: '',
  },
})

// ----------------------
// Cart
// ----------------------
const cart = ref({
  carts: [],
  total: 0,
  final_total: 0,
})

// ----------------------
// Favorites
// ----------------------
const favorites = ref([])
const favoritesLength = computed(() => favorites.value.length)

function loadFavorites() {
  favorites.value = favorite.getFavorite() || []
}

function addFavoriteItem(item) {
  favorite.addFavorite(item)
  loadFavorites()
}

function removeFavoriteItem(item) {
  favorite.removeFavorite(item)
  loadFavorites()
}

// ----------------------
// Submit Form
// ----------------------
function submitForm() {
  alert(`表單已送出: ${JSON.stringify(form.value.user)}`)
}

// ----------------------
// Init
// ----------------------
loadFavorites()
</script>
