import Vuex from 'vuex';
import main from './index';
import { STORE_NAME as modalName } from './addRecipeStore/const';
import modalStore from './addRecipeStore/index';

import { STORE_NAME as recipeName } from './getRecipeStore/const';
import recipeStore from './getRecipeStore/index';

const debug = process.env.NODE_ENV !== 'production';

class StoreHelper {
  constructor() {
    this.store = null;
  }

  generateStore() {
    if (this.store) return this.store;
    this.store = new Vuex.Store({
      modules: {
        main,
        [modalName]: modalStore,
        [recipeName]: recipeStore,
      },
      strict: debug,
    });
    return this.store;
  }
}

export default new StoreHelper();
