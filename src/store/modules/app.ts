import { createRequest } from '@/services/http.service';
import { endpoints } from '@/config';
import { ProductShop } from '@/models/product';
import { MenuItem } from '@/models/menu';
import { FavCountResponse, UserResponse } from '@/models/responses';
import { ProfileUser } from '@/models/models';

interface AppState {
  isAuthenticated: boolean;
  selectedShop: ProductShop | null;
  profilePage: string | null;
  menuLoaded: boolean;
  favouritesCount: number;
  mainMenu: MenuItem[];
}

const updateFavouritesCount = async ({ commit }) => createRequest('GET', endpoints.favourites.counter)
  .then((res: FavCountResponse) => {
    commit('SET_FAVOURITES_COUNT', res.data);
  });

const appState: AppState = {
  selectedShop: null,
  profilePage: null,
  menuLoaded: false,
  isAuthenticated: false,
  favouritesCount: 0,
  mainMenu: [],
};

const getters = {
  getSelectedShop: (state: AppState) => state.selectedShop,
  getProfilePage: (state: AppState) => state.profilePage,
  getMainMenu: (state: AppState) => state.mainMenu,
  getIsAuthenticated: (state: AppState) => state.isAuthenticated,
  getFavouritesCount: (state: AppState) => state.favouritesCount,
};

const mutationTypes = {
  SET_SELECTED_SHOP: 'SET_SELECTED_SHOP',
  SET_PROFILE_PAGE: 'SET_PROFILE_PAGE',
  SET_MAIN_MENU: 'SET_MAIN_MENU',
  SET_MAIN_MENU_LOADED: 'SET_MAIN_MENU_LOADED',
  SET_USER_AUTH: 'SET_USER_AUTH',
  SET_FAVOURITES_COUNT: 'SET_FAVOURITES_COUNT',
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
  [mutationTypes.SET_FAVOURITES_COUNT](state: AppState, payload: number) {
    state.favouritesCount = payload;
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
  async loadUser({ commit }) {
    const vm = (this as any)._vm;
    const { $auth } = vm;
    const token = $auth.token();
    if (token) {
      // load user
      createRequest('GET', endpoints.user, { token })
        .then((res: UserResponse) => {
          const user: ProfileUser = res.data.data.data;
          $auth.user(user);
        })
        .catch(() => {
          $auth.token(null, null, false);
        });

      // load favourites counter
      updateFavouritesCount({ commit });

      // load notifications here
    }
  },
  async updateFavouritesCount({ commit }) {
    await updateFavouritesCount({ commit });
  },
  async fetchMenu({ commit }) {
    commit('SET_MAIN_MENU_LOADED', true);
    return createRequest('get', endpoints.getMenu)
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
