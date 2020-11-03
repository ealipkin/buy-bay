import { ProductShop } from '@/utils/models';

interface AppState {
  selectedShop: ProductShop | null,
}

const state: AppState = {
  selectedShop: null,
};

const getters = {
  getSelectedShop: (state: AppState) => state.selectedShop,
};


const mutationTypes = {
  SET_SELECTED_SHOP: 'SET_SELECTED_SHOP',
};

const mutations = {
  [mutationTypes.SET_SELECTED_SHOP](state: AppState, payload: ProductShop) {
    state.selectedShop = payload ? { ...payload } : payload;
  },
};


const actions = {
  async setSelectedShop({ commit, state }, props) {
    commit('SET_SELECTED_SHOP', props);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
