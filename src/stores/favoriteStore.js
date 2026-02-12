import { defineStore } from 'pinia'
import { useStatusStore } from './statusStore' // 🔴 具名 import
import { useProductStore } from './productStore' // 🔴 具名 import

export const useCartStore = defineStore('cartStore', {
  state: () => ({
    favorites: [],
    favoritesLength: 0,
  }),

  actions: {
    getFavorite() {
      const status = useStatusStore() // 🔴 在 action 裡呼叫
      const product = useProductStore() // 🔴 在 action 裡呼叫

      const favoriteDatas = JSON.parse(localStorage.getItem('favoriteDatas')) || []
      this.favorites = favoriteDatas
      this.favoritesLength = favoriteDatas.length

      product.getProducts({ isPagination: false })
    },

    addToFavorite(productItem) {
      const status = useStatusStore() // 🔴 在 action 裡呼叫

      const exists = this.favorites.some((item) => item.id === productItem.id)
      if (exists) {
        status.updateMessage({ message: '此商品已在我的最愛中', status: 'warning' })
        return
      }

      this.favorites.push({ id: productItem.id, title: productItem.title })
      localStorage.setItem('favoriteDatas', JSON.stringify(this.favorites))
      this.getFavorite()

      status.updateMessage({ message: '已加入我的最愛', status: 'success' })
    },

    removeFavorite({ favoriteItem, delall }) {
      const status = useStatusStore() // 🔴 在 action 裡呼叫

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
