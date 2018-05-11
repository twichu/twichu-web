import userService from '@/services/user.service';

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
  patchProfile(context, profile) {
    return userService.patchProfile(profile).then((data) => {
      context.commit('patchProfile', data);
    });
  },
};

const mutations = {
  getProfile(states, profile) {
    state.profile = profile;
  },
  patchProfile(states, profile) {
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
