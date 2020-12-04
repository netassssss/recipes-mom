import { Http } from 'vue-resource';

const server = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : 'https://fast-peak-05863.herokuapp.com';

/* eslint no-debugger:0 */
export default class {
  static getRecipes() {
    return Http.get(`${server}/api/get-recipes`);
  }

  static saveRecipe({
    title, ingredients, description, documentId,
  }) {
    return Http.post(`${server}/api/set-recipe`, {
      title, ingredients, description, documentId,
    });
  }
}
