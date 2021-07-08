import Vue from "vue";
import Vuex from 'vuex';

import main from './mainPage'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    main
  }
})
