import userService from '../services/user.service';

const state = {
  profile: {},
};

const getters = {
  profile: states => states.profile,
};

const actions = {
  getProfile(context) {
    return userService.getProfile().then((data) => {
      context.commit('getProfile', data);
    });
  },
};

const mutations = {
  getProfile(states, profile) {
    state.profile = profile;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
