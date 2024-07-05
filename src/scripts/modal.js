export function openPopup(popupElement) {
  document.addEventListener("keydown", handleEscape);
  popupElement.classList.add("popup_is-opened");
}

export function closePopup(popupElement) {
  document.removeEventListener("keydown", handleEscape);
  popupElement.classList.remove("popup_is-opened");
}

function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closePopup(openedPopup);
  }
}
