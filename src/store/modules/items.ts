import { createRequest } from '@/services/http.service';
import { Product } from '@/utils/models';

/*
Если пустой результат, то сначала нагенерировать новых групп перед запуском  (время то идет): https://kd-dev.ru/api/v1/group/seeds
* */

const endpoints = {
  GET_POPULAR_ITEMS: '/mp/popular',
  GET_HOT_ITEMS: '/mp/hot_groups',
  GET_BEST_ITEMS: '/mp/bestseller',
  GET_TOP_CAT_ITEMS: '/mp/top_cat',
};

interface ItemState {
  loaded: boolean;
  items: Product[];
}

interface ItemsState {
  popular: ItemState;
  hot: ItemState;
  best: ItemState;
}

const itemsState: ItemsState = {
  popular: {
    loaded: false,
    items: [],
  },
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
  getPopularItemsEntities: (state: ItemsState) => state.popular.items,
  getHotItemsEntities: (state: ItemsState) => state.hot.items,
  getBestItemsEntities: (state: ItemsState) => state.best.items,
};

const mutationTypes = {
  SET_POPULAR_ITEMS: 'SET_POPULAR_ITEMS',
  SET_POPULAR_ITEMS_LOADED: 'SET_POPULAR_ITEMS_LOADED',
  SET_HOT_ITEMS: 'SET_HOT_ITEMS',
  SET_HOT_ITEMS_LOADED: 'SET_HOT_ITEMS_LOADED',
  SET_BEST_ITEMS: 'SET_BEST_ITEMS',
  SET_BEST_ITEMS_LOADED: 'SET_BEST_ITEMS_LOADED',
};

const mutations = {
  [mutationTypes.SET_POPULAR_ITEMS](state: ItemsState, payload: Product[]) {
    console.log('SET_POPULAR_ITEMS -> ', payload);
    state.popular.items = payload;
  },
  [mutationTypes.SET_POPULAR_ITEMS_LOADED](state: ItemsState, payload: boolean) {
    state.popular.loaded = payload;
  },
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
  async fetchPopularItems({ commit }) {
    commit('SET_POPULAR_ITEMS_LOADED', true);
    return createRequest('get', endpoints.GET_POPULAR_ITEMS)
      .then((res) => {
        const response = res.data.data;
        commit('SET_POPULAR_ITEMS', response);
        return response;
      })
      .finally(() => commit('SET_POPULAR_ITEMS_LOADED', false));
  },
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
