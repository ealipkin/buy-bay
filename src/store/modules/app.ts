import { createRequest } from '@/services/http.service';
import { endpoints } from '@/config';
import { ProductShop } from '@/models/product';
import { MenuItem } from '@/models/menu';
import { FavCountResponse, ProfileCountsResponse, UserResponse } from '@/models/responses';
import { ProfileCounts, ProfileUser } from '@/models/models';

interface AppState {
  selectedShop: ProductShop | null;
  profilePage: string | null;
  menuLoaded: boolean;
  favouritesCount: number;
  mainMenu: MenuItem[];
  profileCounts: ProfileCounts | null;
}

const updateFavouritesCount = async ({ commit }) => createRequest('GET', endpoints.favourites.counter)
  .then((res: FavCountResponse) => {
    commit('SET_FAVOURITES_COUNT', res.data);
  });

const updateProfileCounts = async ({ commit }) => createRequest('GET', endpoints.profile.counts)
  .then((res: ProfileCountsResponse) => {
    commit('SET_PROFILE_COUNTS', res.data.data);
  });

const appState: AppState = {
  selectedShop: null,
  profilePage: null,
  menuLoaded: false,
  favouritesCount: 0,
  mainMenu: [],
  profileCounts: null,
};

const getters = {
  getSelectedShop: (state: AppState) => state.selectedShop,
  getProfilePage: (state: AppState) => state.profilePage,
  getMainMenu: (state: AppState) => state.mainMenu,
  getFavouritesCount: (state: AppState) => state.favouritesCount,
  getProfileCounts: (state: AppState) => state.profileCounts,
};

const mutationTypes = {
  SET_SELECTED_SHOP: 'SET_SELECTED_SHOP',
  SET_PROFILE_PAGE: 'SET_PROFILE_PAGE',
  SET_MAIN_MENU: 'SET_MAIN_MENU',
  SET_MAIN_MENU_LOADED: 'SET_MAIN_MENU_LOADED',
  SET_USER_AUTH: 'SET_USER_AUTH',
  SET_FAVOURITES_COUNT: 'SET_FAVOURITES_COUNT',
  SET_PROFILE_COUNTS: 'SET_PROFILE_COUNTS',
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
  [mutationTypes.SET_FAVOURITES_COUNT](state: AppState, payload: number) {
    state.favouritesCount = payload;
  },
  [mutationTypes.SET_PROFILE_COUNTS](state: AppState, payload: ProfileCounts) {
    state.profileCounts = { ...payload };
  },
};

const actions = {
  async setProfilePage({ commit, state }, props) {
    commit('app/SET_PROFILE_PAGE', props, { root: true });
  },
  async setSelectedShop({ commit, state }, props) {
    commit('app/SET_SELECTED_SHOP', props);
  },
  async setUserAuth({ commit, state }, props) {
    commit('app/SET_USER_AUTH', props, { root: true });
  },
  async logout({ commit }, props) {
    commit('app/SET_USER_AUTH', props);
    const vm = (this as any)._vm;
    const { $auth } = vm;
    $auth.logout();
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
  async updateProfileCounts({ commit }) {
    await updateProfileCounts({ commit });
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
