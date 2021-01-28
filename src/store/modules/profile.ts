import { createRequest } from '@/services/http.service';
import { endpoints } from '@/config';
import { ProfileResponse } from '@/models/responses';
import { ProfileUser } from '@/models/models';

interface ProfileState {
  profile: ProfileUser | null;
  loaded: boolean;
}

const profileState: ProfileState = {
  profile: null,
  loaded: false,
};

const getters = {
  getProfile: (state: ProfileState) => state.profile,
  getProfileLoaded: (state: ProfileState) => state.loaded,
};

const mutationTypes = {
  SET_PROFILE: 'SET_PROFILE',
};

const mutations = {
  [mutationTypes.SET_PROFILE](state: ProfileState, payload: ProfileUser) {
    state.profile = payload;
  },
};

const actions = {
  async loadProfile({ commit }) {
    createRequest('GET', endpoints.profile.load)
      .then((res: ProfileResponse) => {
        const profile = res.data.data;
        commit('SET_PROFILE', profile);
      });
  },

};

export default {
  namespaced: true,
  state: profileState,
  getters,
  actions,
  mutations,
};
