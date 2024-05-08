import Vue from 'vue';
import Vuex from 'vuex';
import addressesStore from './module/addresses.js';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    addressesStore
  }
})