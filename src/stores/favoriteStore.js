import { defineStore } from 'pinia'
import statusStore from '../stores/statusStore'
import productStore from '../stores/productStore'

const status = statusStore()
const product = productStore()

export default defineStore('cartStore', {
  state: () => ({
    favorites: [],
    favoritesLength: 0,
  }),

  actions: {
    getFavorite() {
      const favoriteDatas = JSON.parse(localStorage.getItem('favoriteDatas')) || []
      this.favorites = favoriteDatas
      this.favoritesLength = favoriteDatas.length

      // 呼叫取得所有產品（非分頁）
      product.getProducts({ isPagination: false })
    },

    addToFavorite(productItem) {
      // 檢查是否已存在，避免重複加入
      const exists = this.favorites.some((item) => item.id === productItem.id)
      if (exists) {
        status.updateMessage({ message: '此商品已在我的最愛中', status: 'warning' })
        return
      }

      const favoriteData = {
        id: productItem.id,
        title: productItem.title,
      }

      this.favorites.push(favoriteData)
      localStorage.setItem('favoriteDatas', JSON.stringify(this.favorites))
      this.getFavorite()

      status.updateMessage({ message: '已加入我的最愛', status: 'success' })
    },

    removeFavorite({ favoriteItem, delall }) {
      if (delall) {
        localStorage.removeItem('favoriteDatas')
        this.favorites = []
      } else {
        this.favorites = this.favorites.filter((item) => item.id !== favoriteItem.id)
        localStorage.setItem('favoriteDatas', JSON.stringify(this.favorites))
      }

      this.getFavorite()
      status.updateMessage({ message: '已刪除我的最愛', status: 'warning' })
    },
  },
})
