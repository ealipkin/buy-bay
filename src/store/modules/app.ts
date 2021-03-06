import { createRequest } from '@/services/http.service';
import { endpoints } from '@/config';
import { MenuItem } from '@/models/menu';
import {
  FavCountResponse, ProfileCountsResponse, UserInfoResponse, UserResponse,
} from '@/models/responses';
import { NotificationItem, ProfileCounts, ProfileUser } from '@/models/models';
import { ProductShop } from '@/models/order';

interface AppState {
  selectedShop: ProductShop | null;
  profilePage: string | null;
  menuLoaded: boolean;
  favouritesCount: number;
  mainMenu: MenuItem[];
  profileCounts: ProfileCounts | null;
  readNotifications: NotificationItem[] | null;
  unreadNotifications: NotificationItem[] | null;
}

const mutationTypes = {
  SET_SELECTED_SHOP: 'SET_SELECTED_SHOP',
  SET_PROFILE_PAGE: 'SET_PROFILE_PAGE',
  SET_MAIN_MENU: 'SET_MAIN_MENU',
  SET_MAIN_MENU_LOADED: 'SET_MAIN_MENU_LOADED',
  SET_USER_AUTH: 'SET_USER_AUTH',
  SET_FAVOURITES_COUNT: 'SET_FAVOURITES_COUNT',
  SET_PROFILE_COUNTS: 'SET_PROFILE_COUNTS',
  SET_NOTIFICATIONS: 'SET_NOTIFICATIONS',
};

const loadUser = async (token, $auth) => {
  // load user
  await createRequest('GET', endpoints.user, { token })
    .then((res: UserResponse) => {
      const user: ProfileUser = res.data.data;
      $auth.user(user);
    })
    .catch(() => {
      $auth.token(null, null, false);
    });
};
const updateFavouritesCount = async ({ commit }) => createRequest('GET', endpoints.favourites.counter)
  .then((res: FavCountResponse) => {
    commit(mutationTypes.SET_FAVOURITES_COUNT, res.data);
  });

const getUserInfo = async ({ commit }) => createRequest('GET', endpoints.userInfo)
  .then((res: UserInfoResponse) => {
    const read = res.data.data.notification.read.original.data;
    const unread = res.data.data.notification.unread.original.data;
    commit(mutationTypes.SET_NOTIFICATIONS, { read, unread });
    commit(mutationTypes.SET_FAVOURITES_COUNT, res.data.data.counter);
  });

const getNotifications = async ({ commit }) => {
  const readResponse = await createRequest('GET', endpoints.notifications.getRead);
  const unreadResponse = await createRequest('GET', endpoints.notifications.getUnread);
  const read = readResponse.data.data;
  const unread = unreadResponse.data.data;
  commit(mutationTypes.SET_NOTIFICATIONS, { read, unread });
};

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
  readNotifications: [],
  unreadNotifications: [],
};

const getters = {
  getSelectedShop: (state: AppState) => state.selectedShop,
  getProfilePage: (state: AppState) => state.profilePage,
  getMainMenu: (state: AppState) => state.mainMenu,
  getFavouritesCount: (state: AppState) => state.favouritesCount,
  getProfileCounts: (state: AppState) => state.profileCounts,
  getReadNotifications: (state: AppState) => state.readNotifications,
  getUnreadNotifications: (state: AppState) => state.unreadNotifications,
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
  [mutationTypes.SET_NOTIFICATIONS](state: AppState, payload: { read: NotificationItem[]; unread: NotificationItem[] }) {
    state.readNotifications = [...payload.read];
    state.unreadNotifications = [...payload.unread];
  },
};

const actions = {
  async setProfilePage({ commit, state }, props) {
    commit('app/SET_PROFILE_PAGE', props, { root: true });
  },
  async setSelectedShop({ commit, state }, props) {
    commit('app/SET_SELECTED_SHOP', props, { root: true });
  },
  async setUserAuth({ commit }) {
    // commit(mutationTypes.SET_USER_AUTH, props);
    // debugger
    updateProfileCounts({ commit });
  },
  async logout({ commit }) {
    // commit('app/SET_USER_AUTH', props);
    const vm = (this as any)._vm;
    const { $auth } = vm;
    $auth.logout();
    commit(mutationTypes.SET_FAVOURITES_COUNT, 0);
  },
  async loadUser(store) {
    const { commit } = store;
    const vm = (this as any)._vm;
    const { $auth } = vm;
    const token = $auth.token();
    if (token) {
      await loadUser(token, $auth);
      await getUserInfo({ commit });
      await store.dispatch('readNotification');
    }
  },
  async updateFavouritesCount({ commit }) {
    await updateFavouritesCount({ commit });
  },
  async updateUser() {
    const vm = (this as any)._vm;
    const { $auth } = vm;
    const token = $auth.token();
    await loadUser(token, $auth);
  },
  async getUserInfo({ commit }) {
    await getUserInfo({ commit });
  },
  async updateProfileCounts({ commit }) {
    const vm = (this as any)._vm;
    const { $auth } = vm;
    const isAuthorized = $auth.check();
    if (isAuthorized) {
      await updateProfileCounts({ commit });
    }
  },
  async getNotifications({ commit }) {
    await getNotifications({ commit });
  },
  async readNotification() {
    const vm = (this as any)._vm;
    const { $auth } = vm;
    const isAuthorized = $auth.check();
    const { notification } = Object.fromEntries(new URLSearchParams(window.location.search));
    if (isAuthorized && notification) {
      await createRequest('GET', endpoints.notifications.markAsRead(notification));
    }
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
