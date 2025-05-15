import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

import armorList from '@/armor.json'

export default new Vuex.Store({
  actions: {

  },

  mutations: {
    INSERT_SCHEMELIST(state, payload) {
      const { schemeTitle, schemeRole, id } = payload

      const parts = payload.parts.map(part => {
        return {
          name: part.name,
          id: part.id
        }
      });

      state.schemeList.push({
        schemeTitle,
        schemeRole,
        parts,
        id
      })

    },

    IMPORT_SCHEMELIST(state, payload) {
      state.schemeList = payload
    },

    DELETE_SCHEMELIST(state, id) {
      state.schemeList = state.schemeList.filter(item => item.id !== id);
    },

    UPDATE_SCHEME(state, payload) {
      state.scheme = payload
    },
  },

  state: {
    armorList,
    schemeList: [],
    scheme: {},
  },

  getters: {

  },

  modules: {
  },

  plugins: [createPersistedState({
    key: 'schemeList', // 存储持久状态的键
    paths: ['schemeList'], // 只持久化 user 和 person 状态
  })]
})
