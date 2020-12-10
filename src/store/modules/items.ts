import { createRequest } from '@/services/http.service';
import { Product } from '@/utils/models';

const endpoints = {
  GET_HOT_ITEMS: '/product/get_hot_groups',
  GET_BEST_ITEMS: '/product/get_bestseller',
};

interface ItemState {
  loaded: boolean;
  items: Product[];
}

interface ItemsState {
  hot: ItemState;
  best: ItemState;
}

const itemsState: ItemsState = {
  hot: {
    loaded: false,
    items: [],
  },
  best: {
    loaded: false,
    items: [],
  },
};

const getters = {
  getHotItemsEntities: (state: ItemsState) => state.hot.items,
  getBestItemsEntities: (state: ItemsState) => state.best.items,
};

const mutationTypes = {
  SET_HOT_ITEMS: 'SET_HOT_ITEMS',
  SET_HOT_ITEMS_LOADED: 'SET_HOT_ITEMS_LOADED',
  SET_BEST_ITEMS: 'SET_BEST_ITEMS',
  SET_BEST_ITEMS_LOADED: 'SET_BEST_ITEMS_LOADED',
};

const mutations = {
  [mutationTypes.SET_HOT_ITEMS](state: ItemsState, payload: Product[]) {
    state.hot.items = payload;
  },
  [mutationTypes.SET_HOT_ITEMS_LOADED](state: ItemsState, payload: boolean) {
    state.hot.loaded = payload;
  },
  [mutationTypes.SET_BEST_ITEMS](state: ItemsState, payload: Product[]) {
    state.best.items = payload;
  },
  [mutationTypes.SET_BEST_ITEMS_LOADED](state: ItemsState, payload: boolean) {
    state.best.loaded = payload;
  },
};

const actions = {
  async fetchHotItems({ commit }) {
    commit('SET_HOT_ITEMS_LOADED', true);
    return createRequest('get', endpoints.GET_HOT_ITEMS)
      .then((res) => {
        const response = res.data.data;
        commit('SET_HOT_ITEMS', response);
        return response;
      })
      .finally(() => commit('SET_HOT_ITEMS_LOADED', false));
  },
  async fetchBestItems({ commit }) {
    commit('SET_BEST_ITEMS_LOADED', true);
    return createRequest('get', endpoints.GET_BEST_ITEMS)
      .then((res) => {
        const response = res.data.data;
        commit('SET_BEST_ITEMS', response);
        return response;
      })
      .finally(() => commit('SET_BEST_ITEMS_LOADED', false));
  },
};

export default {
  namespaced: true,
  state: itemsState,
  getters,
  actions,
  mutations,
};
