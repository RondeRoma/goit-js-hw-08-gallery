import images from './gallery.js';

  const refs = {
    galleryContainer: document.querySelector('.js-gallery'),
    galleryLightbox: document.querySelector('.lightbox'),
    galleryLightboxImage: document.querySelector('.lightbox__image'),
    btnCloseModal: document.querySelector('[data-action="close-lightbox"]'),
    closeModalOverlay: document.querySelector('.lightbox__overlay'),
};
const galleryMarkup = createGallery(images);

refs.galleryContainer.addEventListener('click', onGalleryContainerClick);
refs.btnCloseModal.addEventListener('click', onRemoveClassList);
refs.closeModalOverlay.addEventListener('click', onRemoveClassList);
refs.galleryContainer.insertAdjacentHTML("beforeend", galleryMarkup);

function createGallery(images) {
  return images
    .map(({ preview, original, description }) => {
      return `
    <li class="gallery__item">
        <a
            class="gallery__link"
            href="${original}"
        >
            <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
            />
        </a>
    </li>
    `;
    })
    .join("");
}

function onGalleryContainerClick(event) {
    window.addEventListener('keydown', onEscKeydown);
    event.preventDefault();
    if (event.target.nodeName === 'IMG') {
        refs.galleryLightbox.classList.add('is-open');
        refs.galleryLightboxImage.src = event.target.dataset.source;
        refs.galleryLightboxImage.alt = event.target.dataset.alt;
    }
}

function onRemoveClassList() {
    refs.galleryLightbox.classList.remove('is-open');
    refs.galleryLightboxImage.removeAttribute('src');
    refs.galleryLightboxImage.removeAttribute('alt');
}

function onEscKeydown(event) {
    if (event.code === 'Escape') {
       onRemoveClassList()
    }
}