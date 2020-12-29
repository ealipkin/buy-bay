import { createRequest } from '@/services/http.service';
import { MenuItem, ProductShop } from '@/utils/models';

const endpoints = {
  GET_MENU: '/category/tree',
};

interface AppState {
  isAuthenticated: boolean;
  selectedShop: ProductShop | null;
  profilePage: string | null;
  menuLoaded: boolean;
  mainMenu: MenuItem[];
}

const appState: AppState = {
  selectedShop: null,
  profilePage: null,
  menuLoaded: false,
  isAuthenticated: false,
  mainMenu: [],
};

const getters = {
  getSelectedShop: (state: AppState) => state.selectedShop,
  getProfilePage: (state: AppState) => state.profilePage,
  getMainMenu: (state: AppState) => state.mainMenu,
  getIsAuthenticated: (state: AppState) => state.isAuthenticated,
};

const mutationTypes = {
  SET_SELECTED_SHOP: 'SET_SELECTED_SHOP',
  SET_PROFILE_PAGE: 'SET_PROFILE_PAGE',
  SET_MAIN_MENU: 'SET_MAIN_MENU',
  SET_MAIN_MENU_LOADED: 'SET_MAIN_MENU_LOADED',
  SET_USER_AUTH: 'SET_USER_AUTH',
};

const mutations = {
  [mutationTypes.SET_PROFILE_PAGE](state: AppState, payload: string) {
    state.profilePage = payload;
  },
  [mutationTypes.SET_SELECTED_SHOP](state: AppState, payload: ProductShop) {
    state.selectedShop = payload ? { ...payload } : payload;
  },
  [mutationTypes.SET_MAIN_MENU](state: AppState, payload: MenuItem[]) {
    state.mainMenu = payload;
  },
  [mutationTypes.SET_MAIN_MENU_LOADED](state: AppState, payload: boolean) {
    state.menuLoaded = payload;
  },
  [mutationTypes.SET_USER_AUTH](state: AppState, payload: boolean) {
    state.isAuthenticated = payload;
  },
};

const actions = {
  async setProfilePage({ commit, state }, props) {
    commit('SET_PROFILE_PAGE', props);
  },
  async setSelectedShop({ commit, state }, props) {
    commit('SET_SELECTED_SHOP', props);
  },
  async setUserAuth({ commit, state }, props) {
    commit('SET_USER_AUTH', props);
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
