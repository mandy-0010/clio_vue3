<template>
  <!--header-->
  <div class="container">
    <Alert />
    <nav class="navbar navbar-expand-lg navbar-light bg-light mt-4 text-right">
      <a href="#" class="font-italic text-dbrown text-decoration-none"> <h3>CLio ACcessory</h3></a>
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
          <li class="nav-item active" @click="fresh()">
            <i class="bi bi-bookmark-heart"></i>
            <router-link to="/Jindex" class="nav-link text-dbrown"
              >Home/首頁 <span class="sr-only">(current)</span></router-link
            >
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
          <li class="nav-item active">
            <router-link to="/Login" class="nav-link text-dbrown"
              ><span class="material-icons"> account_circle</span></router-link
            >
          </li>
          <li class="nav-item active">
            <router-link to="/Checkout" class="nav-link text-dbrown"
              ><span class="material-icons"> shopping_cart</span
              ><span>({{ cart.carts.length }})</span></router-link
            >
          </li>

          <li class="nav-item active">
            <!--我的最愛data-toggle="dropdown"-->
            <div class="dropdown">
              <a
                class="btn text-dbrown px-0"
                href="#"
                role="button"
                data-toggle="dropdown"
                aria-expanded="false"
                ><span class="material-icons"> favorite</span>
                <span class="">({{ favoritesLength }})</span></a
              >

              <div class="dropdown-menu dropdown-menu-right">
                <h5 class="text-center py-2">我的最愛</h5>
                <table class="table">
                  <tbody>
                    <tr class="" v-for="favorite in favorites" :key="favorite.id">
                      <td class="py-2 text-center" width="">
                        <a
                          href="#"
                          class="text-danger border-0"
                          @click.prevent="removeFavorite(favorite, false)"
                        >
                          <i class="fas fa-times"></i
                        ></a>
                      </td>

                      <td class="py-2 px-1 text-center" width="">
                        {{ favorite.title }}
                      </td>
                      <td class="py-1 px-0 text-center" width="">
                        <button
                          class="btn text-dbrown btn-sm py-1"
                          @click="addtoCart(favorite.id, 1)"
                        >
                          <span class="material-icons"> shopping_cart</span>
                        </button>
                      </td>
                    </tr>
                    <tr :class="{ 'd-none': favorites.length }">
                      <td class="text-center">我的最愛是空的</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </nav>

    <!--section 清單列表-->
    <section>
      <!--結帳步驟-->
      <div class="mt-5 row justify-content-center">
        <div class="my-3 pt-2 col-md-10">
          <div class="row">
            <!--step1-->
            <div class="col-sm-3 rounded justify-content-center bg-dbrown">
              <h6 class="text-center text-white">Step 1</h6>
              <h4 class="text-center text-white">購物明細</h4>
            </div>

            <div class="col-sm-1 d-none d-sm-block text-dbrown align-self-center">
              <span class="material-icons"> forward </span>
            </div>

            <!--step2-->
            <div class="col-sm-3 d-none d-sm-block justify-content-center">
              <h6 class="text-center text-dbrown">Step 2</h6>
              <h4 class="text-center text-dbrown">填寫資料</h4>
            </div>

            <div class="col-sm-1 d-none d-sm-block text-dbrown align-self-center">
              <span class="material-icons"> forward </span>
            </div>

            <!--step3-->
            <div class="col-sm-3 d-none d-sm-block justify-content-center">
              <h6 class="text-center text-dbrown">Step 3</h6>
              <h4 class="text-center text-dbrown">完成訂單</h4>
            </div>
          </div>
        </div>
      </div>
      <!--購物車清單-->
      <div class="mt-5 row justify-content-center">
        <div class="my-5 row justify-content-center">
          <table class="table">
            <thead>
              <th></th>
              <th>商品資料</th>
              <th>數量</th>
              <th>價格</th>
              <th>刪除</th>
            </thead>
            <tbody>
              <tr v-for="item in cart.carts" :key="item.id">
                <td>
                  <div
                    style="
                      height: 50px;
                      width: 50px;
                      background-size: cover;
                      background-position: center;
                    "
                    :style="{ backgroundImage: `url(${item.product.imageUrl})` }"
                  ></div>
                </td>
                <td class="align-middle">
                  {{ item.product.title }}
                  <div class="text-danger" v-if="item.coupon">已套用優惠券</div>
                </td>
                <td class="align-middle">{{ item.qty }}{{ item.product.unit }}</td>
                <td class="align-middle">${{ item.final_total }}</td>
                <td class="align-middle">
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm"
                    @click="removeCartItem(item.id)"
                  >
                    <i class="far fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td></td>
                <td colspan="3" class="text-right">總計</td>

                <td class="">${{ cart.total }}</td>
              </tr>
              <tr v-if="cart.final_total !== cart.total">
                <td></td>
                <td colspan="3" class="text-right text-danger">折扣價</td>
                <td class="text-danger">${{ cart.final_total }}</td>
              </tr>
            </tfoot>
          </table>

          <!--優惠券欄位-->
          <div class="input-group input-group-sm">
            <input
              type="text"
              class="form-control"
              v-model="coupon_code"
              placeholder="請輸入優惠碼"
            />
            <div class="input-group-append">
              <button class="btn btn-dbrown text-white" type="button" @click="addCouponCode">
                套用優惠碼
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="mb-5 text-center">
        <router-link to="/Checkorder" class="btn btn-brown text-white">下一步</router-link>
      </div>
    </section>

    <!--footer-->
    <section>
      <div class="row bg-brown pt-5">
        <div class="col-md-4 pb-5 pl-lg-4">
          <h5 class="text-white font-weight-bold pb-2">品牌故事</h5>
          <a href="#" class="text-decoration-none"
            ><h6 class="text-white font-weight-bold">關於品牌</h6></a
          >
          <a href="#" class="text-decoration-none"
            ><h6 class="text-white font-weight-bold">聯絡我們</h6></a
          >
        </div>
        <div class="col-md-4 pb-5 pl-lg-4 pl-md-1">
          <h5 class="text-white font-weight-bold pb-2">商品專區</h5>
          <router-link to="/Productlist" class="text-decoration-none"
            ><h6 class="text-white font-weight-bold text-nowrap">
              戒指 <span class="text-white-50">Rings</span>
            </h6></router-link
          >
          <router-link to="/Productlist" class="text-decoration-none"
            ><h6 class="text-white font-weight-bold text-nowrap">
              項鍊 <span class="text-white-50">Necklaces</span>
            </h6></router-link
          >
          <router-link to="/Productlist" class="text-decoration-none"
            ><h6 class="text-white font-weight-bold text-nowrap">
              眼鏡 <span class="text-white-50">Glasses</span>
            </h6></router-link
          >
          <router-link to="/Productlist" class="text-decoration-none"
            ><h6 class="text-white font-weight-bold text-nowrap">
              手錶 <span class="text-white-50">Watches</span>
            </h6></router-link
          >
          <router-link to="/Productlist" class="text-decoration-none"
            ><h6 class="text-white font-weight-bold text-nowrap">
              手鍊 <span class="text-white-50">Bracelets</span>
            </h6></router-link
          >
          <router-link to="/Productlist" class="text-decoration-none"
            ><h6 class="text-white font-weight-bold text-nowrap">
              耳環 <span class="text-white-50">Earrings</span>
            </h6></router-link
          >
        </div>
        <div class="col-md-4 pb-5 pl-lg-4 pl-md-1">
          <h5 class="text-white font-weight-bold pb-2">聯絡我們</h5>
          <h6 class="text-white font-weight-bold">電話: 02 122 5678</h6>
          <h6 class="text-white font-weight-bold">Email:<span>clioservice@gmail.com</span></h6>
          <p class="text-white font-weight-bold">MON - FRI : 9:00 am - 18:00pm</p>
          <div class="d-flex">
            <a href="#" class="px-2"><i class="fab fa-facebook-square text-white fa-2x"></i></a>
            <a href="#" class="px-2"><i class="fab fab fa-instagram text-white fa-2x"></i></a>
            <a href="#" class="px-2"><i class="fab fab fa-line text-white fa-2x"></i></a>
          </div>
        </div>
      </div>
    </section>
  </div>
  <!--container-->
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'

// 🔴 正確的 store import
import { useStatusStore } from '@/stores/statusStore'
import { useProductStore } from '@/stores/productStore'
import { useCartStore } from '@/stores/favoriteStore' // 注意這裡用 useCartStore

// Components
import Alert from '@/components/AlertMessage.vue'

// 🔴 初始化 store
const status = useStatusStore()
const product = useProductStore()
const favorite = useCartStore()

// 解構 store 的 refs
const { products, productId, filterProducts } = storeToRefs(product)
const { messages, isLoading } = storeToRefs(status)
const { favorites, favoritesLength } = storeToRefs(favorite)

// Store 函式
const { getProducts } = product
const { addToFavorite, removeFavorite, getFavorite } = favorite

// 本地 state
const form = ref({
  user: {
    name: '',
    email: '',
    tel: '',
    address: '',
  },
})

const cart = ref({
  carts: [],
  total: 0,
  final_total: 0,
})

const coupon_code = ref()
</script>
