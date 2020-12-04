import images from "./gallery.js";

const refs = {
  galleryContainer: document.querySelector(".js-gallery"),
  galleryLightbox: document.querySelector(".js-lightbox"),
  closeModalOverlay: document.querySelector(".lightbox__overlay"),
  galleryLightboxImage: document.querySelector(".lightbox__image"),
  btnCloseModal: document.querySelector(".lightbox__button"),
  buttonRight: document.querySelector(".svg_right"),
  buttonLeft: document.querySelector(".svg_left"),
};

images.map((el, index) => {
  refs.galleryContainer.innerHTML += `<li class="gallery__item"><a class="gallery__link" href="${el.preview}"><img class="gallery__image" src="${el.preview}" data-source="${el.original}" alt="${el.description}" data-index="${index}"/></a></li>`;
});

refs.galleryContainer.addEventListener("click", openModal);
refs.btnCloseModal.addEventListener("click", removeClassList);
refs.closeModalOverlay.addEventListener("click", removeClassList);
refs.buttonRight.addEventListener("click", arrowRight);
refs.buttonLeft.addEventListener("click", arrowLeft);

function onKeybordPress(e) {
  const ESC_KEY_CODE = "Escape";
  const isEscKey = e.code === ESC_KEY_CODE;
  
  if (isEscKey) {
    removeClassList();
  }
  if (e.key === "ArrowRight") {
    arrowRight();
  }
  if (e.key === "ArrowLeft") {
    arrowLeft();
  }
}
function openModal(e){
  e.preventDefault();
  if (e.target.nodeName !== "IMG") {
    return;
  }
  window.addEventListener("keydown", onKeybordPress);
  
  refs.galleryLightbox.classList.add("is-open");
  refs.galleryLightboxImage.src = e.target.dataset.source;
  refs.galleryLightboxImage.dataset.index = e.target.dataset.index;
}

function removeClassList() {
  window.removeEventListener('keydown', onKeybordPress);
 
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
