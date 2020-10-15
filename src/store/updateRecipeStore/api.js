import { Http } from 'vue-resource';

/* eslint no-debugger:0 */
export default class {
  static getRecipes() {
    return Http.get('https://fast-peak-05863.herokuapp.com/api/get-recipes');
  }

  static saveRecipe({
    title, ingredients, description, documentId,
  }) {
    return Http.post('https://fast-peak-05863.herokuapp.com/api/set-recipe', {
      title, ingredients, description, documentId,
    });
  }
}
