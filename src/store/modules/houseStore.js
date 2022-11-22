const houseStore = {
  namespaced: true,
  state: {
    housedeals: [],
  },
  mutations: {
    SET_HOUSEDEALS(state, housedeals) {
      state.housedeals = housedeals;
    },
  },
};

export default houseStore;
