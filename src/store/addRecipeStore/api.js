import { Http } from 'vue-resource';

export const server = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : 'https://fast-peak-05863.herokuapp.com';

export default class {
  static saveRecipe({
    title, ingredients, description, documentId,
  }) {
    return Http.post(`${server}/api/set-recipe`, {
      title, ingredients, description, documentId,
    });
  }
}
