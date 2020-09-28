import getters from './getters';

/* eslint no-debugger:0 */
const getState = () => ({
  recipeProcess: {},
});
const actions = {
  setProcess({ commit }, { key, value }) {
    commit('SET_PROCESS', { key, value });
  },
};
const mutations = {
  SET_PROCESS(state, { key, value }) {
    const recipe = {
      ...state.recipeProcess,
      [key]: value,
    };
    state.recipeProcess = recipe;
  },
};

export default {
  namespaced: true,
  state: getState(),
  getters,
  actions,
  mutations,
};
