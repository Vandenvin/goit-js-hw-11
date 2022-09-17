const API_KEY = '29926822-e010085104708a67d75f2365e';
const BASE_URL = 'https://pixabay.com/api';

export default class ImagesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.perPage = 8;
    this.maxPages = 0;
  }

  fetchImages() {
    return fetch(
      `${BASE_URL}/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${this.perPage}`
    ).then(response => {
      if (!response.ok) {
        throw Error('Error');
      }
      return response.json();
    });
  }

  // get query() {
  //   return this.searchQuery;
  // }

  // set query(newQuery) {
  //   this.searchQuery = newQuery;
  // }

  incremetPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  countMaxPages() {}
}
