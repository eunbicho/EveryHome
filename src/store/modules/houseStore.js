const houseStore = {
  namespaced: true,
  state: {
    housedeals: [],
    markerPositions: [],
    contents: [],
    geocoder: null,
  },
  mutations: {
    SET_HOUSEDEALS(state, housedeals) {
      state.housedeals = housedeals;
    },
    SET_MARKER_POSITIONS(state, positions) {
      state.markerPositions = positions;
    },
    SET_CONTENTS(state, contents) {
      state.contents = contents;
    },
    CLEAR_HOUSEDEALS(state) {
      state.housedeals = [];
    },
  },
};

export default houseStore;
