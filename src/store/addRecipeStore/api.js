import { Http } from 'vue-resource';

export default class {
  static saveRecipe({ title, ingredients, description }) {
    return Http.post('', {});
  }
}
