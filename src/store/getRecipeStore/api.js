import { Http } from 'vue-resource';

export default class {
  static getRecipes() {
    return Http.get('http://localhost:3000/api/get-recipes');
  }
}
