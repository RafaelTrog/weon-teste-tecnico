const namespaced = true;

const state = {
  addresses: JSON.parse(localStorage.getItem("weon-addresses")) || []
};

const actions = {
  addAddress({ commit }, address) {
    commit('newAddress', address);
    localStorage.setItem("weon-addresses", JSON.stringify(state.addresses))
  },
  deleteAddress({ commit, state }, index) {
    commit("removeAddress", index);
    localStorage.setItem("weon-addresses", JSON.stringify(state.addresses))
  },
  updateAddress({ commit, state }, { index, addressToUpdate }) {
    commit('updateAddress', { index, addressToUpdate });
    localStorage.setItem("weon-addresses", JSON.stringify(state.addresses))
  }
}

const mutations = {
  newAddress: (state, address) => {
    state.addresses.unshift(address);
  },
  removeAddress: (state, index) => {
    state.addresses.splice(index, 1);
  },
  updateAddress: (state, {index, addressToUpdate}) => {
    let addressesCopy = [...state.addresses];
    addressesCopy[index] = addressToUpdate;
    state.addresses = addressesCopy
  }
};

export default {
  namespaced,
  state,
  actions,
  mutations
}