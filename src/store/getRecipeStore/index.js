import getters from './getters';

import Api from './api';

const getState = () => ({});
const actions = {
  async init() {
    await Api.getRecipes();
  },
};
const mutations = {};

export default {
  namespaced: true,
  state: getState(),
  getters,
  actions,
  mutations,
};
