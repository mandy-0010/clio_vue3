import axios from 'axios'
import { defineStore } from 'pinia'
import { useStatusStore } from './statusStore' // 🔴 在 action 裡呼叫

export const useProductStore = defineStore('productStore', {
  state: () => ({
    products: [],
    product: {},
    productid: '',
  }),

  getters: {
    filterProducts() {
      const vm = this
      if (vm.filterText) {
        vm.select = '全部商品'
        return vm.products.filter((item) => item.title.indexOf(vm.filterText) !== -1)
      }
      if (vm.select !== '全部商品') {
        return vm.products.filter((item) => item.category === vm.select)
      }
      return vm.products
    },
  },

  actions: {
    getProducts({ isPagination, page }) {
      const status = useStatusStore() // 🔴 在 action 裡呼叫

      let api
      if (isPagination) {
        api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/products?page=${page}`
      } else {
        api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`
      }

      status.isLoading = true

      axios
        .get(api)
        .then((response) => {
          if (response.data.success) {
            this.products = response.data.products
            if (isPagination) {
              status.pagination = response.data.pagination
            }
          } else {
            status.updateMessage({
              message: response.data.message,
              status: 'danger',
            })
          }
          status.isLoading = false
        })
        .catch((err) => {
          status.updateMessage({
            message: err.message || '取得產品失敗',
            status: 'danger',
          })
          status.isLoading = false
        })
    },
  },
})
