import { Http } from 'vue-resource';

export default class {
  static saveRecipe({
    title, ingredients, description, documentId,
  }) {
    return Http.post('http://localhost:3000/api/set-recipe', {
      title, ingredients, description, documentId,
    });
  }
}
