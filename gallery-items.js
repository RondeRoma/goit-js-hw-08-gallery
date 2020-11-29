import images from "./gallery.js";

const refs = {
  galleryContainer: document.querySelector(".js-gallery"),
  galleryLightbox: document.querySelector(".js-lightbox"),
  closeModalOverlay: document.querySelector(".lightbox__overlay"),
  galleryLightboxImage: document.querySelector(".lightbox__image"),
  btnCloseModal: document.querySelector(".lightbox__button"),
};

images.map((el, index) => {
  refs.galleryContainer.innerHTML += `<li class="gallery__item"><a class="gallery__link" href="${el.preview}"><img class="gallery__image" src="${el.preview}" data-source="${el.original}" alt="${el.description}" data-index="${index}"/></a></li>`;
});

refs.galleryContainer.addEventListener("click", (e) => {
  e.preventDefault();
  let modalRef = e.target.dataset.source;
  refs.galleryLightbox.classList.add("is-open");
  refs.galleryLightboxImage.src = modalRef;
  refs.galleryLightboxImage.dataset.index = e.target.dataset.index;
});

refs.btnCloseModal.addEventListener("click", removeClassList);
refs.closeModalOverlay.addEventListener("click", removeClassList);

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    removeClassList();
  }
  if (e.key === "ArrowLeft") {
    arrowLeft();
  }
  if (e.key === "ArrowRight") {
    arrowRight();
  }
});

function removeClassList() {
  refs.galleryLightbox.classList.remove("is-open");
  refs.galleryLightboxImage.src = "";
}

function setNewSrc(step, index) {
  refs.galleryLightboxImage.dataset.index = `${index + step}`;
  refs.galleryLightboxImage.src = images[index + step].original;
}

function arrowLeft() {
  let idx = +refs.galleryLightboxImage.dataset.index;
  if (idx === 0) {
    setNewSrc(0, images.length - 1);
    return;
  }
  setNewSrc(-1, idx);
}

function arrowRight() {
  let idx = +refs.galleryLightboxImage.dataset.index;
  if (idx === images.length - 1) {
    setNewSrc(0, 0);
    return;
  }
  setNewSrc(1, idx);
}
