import { createRequest } from '@/services/http.service';
import { MenuItem, ProductShop } from '@/utils/models';

const endpoints = {
  GET_MENU: '/category/tree',
};

interface AppState {
  selectedShop: ProductShop | null;
  menuLoaded: boolean;
  mainMenu: MenuItem[];
}

const appState: AppState = {
  selectedShop: null,
  menuLoaded: false,
  mainMenu: [],
};

const getters = {
  getSelectedShop: (state: AppState) => state.selectedShop,
  getMainMenu: (state: AppState) => state.mainMenu,
};

const mutationTypes = {
  SET_SELECTED_SHOP: 'SET_SELECTED_SHOP',
  SET_MAIN_MENU: 'SET_MAIN_MENU',
  SET_MAIN_MENU_LOADED: 'SET_MAIN_MENU_LOADED',
};

const mutations = {
  [mutationTypes.SET_SELECTED_SHOP](state: AppState, payload: ProductShop) {
    state.selectedShop = payload ? { ...payload } : payload;
  },
  [mutationTypes.SET_MAIN_MENU](state: AppState, payload: MenuItem[]) {
    state.mainMenu = payload;
  },
  [mutationTypes.SET_MAIN_MENU_LOADED](state: AppState, payload: boolean) {
    state.menuLoaded = payload;
  },
};

const actions = {
  async setSelectedShop({ commit, state }, props) {
    commit('SET_SELECTED_SHOP', props);
  },
  async fetchMenu({ commit }) {
    commit('SET_MAIN_MENU_LOADED', true);
    return createRequest('get', endpoints.GET_MENU)
      .then((res) => {
        const response = res.data.data;
        commit('SET_MAIN_MENU', response);
        return response;
      })
      .finally(() => commit('SET_MAIN_MENU_LOADED', false));
  },
};

export default {
  namespaced: true,
  state: appState,
  getters,
  actions,
  mutations,
};
