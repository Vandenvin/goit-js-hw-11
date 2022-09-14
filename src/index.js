import fetchImages from './js/fetchImages';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css';

Notify.init({
  width: '350px',
  // fontSize: '18px',
  position: 'right-top',
  distance: '10px',
  opacity: 1,
  success: {
    background: '#008900',
    notiflixIconColor: '#003b00',
  },
});

const searchForm = document.querySelector('.search-form');
const galleryContainer = document.querySelector('.gallery');

const lbGallery = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 300,
  loop: false,
});

searchForm.addEventListener('submit', onSubmitClick);

function onSubmitClick(event) {
  event.preventDefault();
  galleryContainer.innerHTML = ``;

  const searchQuery = event.currentTarget.elements.searchQuery.value;

  if (searchQuery === '') {
    return alert('Введи что-то');
  }

  fetchImages(searchQuery).then(images => {
    if (images.hits.length === 0) {
      return Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    Notify.success(`Hooray! We found ${images.totalHits} images.`);
    galleryContainer.innerHTML = createGallery(images);

    lbGallery.refresh();
  });
}

function createGallery(images) {
  return images.hits
    .map(hit => {
      return `
              <li class="photo-card-wrapper">
                <div class="photo-card">
                  <a href="${hit.largeImageURL}" >
                    <img
                      src="${hit.webformatURL}"
                      alt="${hit.tags}" 
                      loading="lazy" />
                  </a>  
                  <div class="info">
                    <p class="info-item">
                      <b>Likes</b>${hit.likes}
                    </p>
                    <p class="info-item">
                      <b>Views</b>${hit.views}
                    </p>
                    <p class="info-item">
                      <b>Comments</b>${hit.comments}
                    </p>
                    <p class="info-item">
                      <b>Downloads</b>${hit.downloads}
                    </p>
                  </div>
                </div>
              </li>
        `;
    })
    .join('');
}
