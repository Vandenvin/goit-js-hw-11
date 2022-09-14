const API_KEY = '29926822-e010085104708a67d75f2365e';
const BASE_URL = 'https://pixabay.com/api';

export default function fetchImages(searchQuery) {
  return fetch(
    `${BASE_URL}/?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`
  ).then(response => {
    if (!response.ok) {
      throw Error('Error');
    }
    return response.json();
  });
}
