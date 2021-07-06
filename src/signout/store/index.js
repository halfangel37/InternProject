const mutations = {
  CLEAR_USER_DATA() {
    localStorage.removeItem("token");
    location.reload();
  },
};

const actions = {
  signoutAccount({ commit }) {
    commit("CLEAR_USER_DATA");
  },
};

export default {
  namespaced: true,
  mutations,
  actions,
}
