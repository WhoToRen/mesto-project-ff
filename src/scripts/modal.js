export function openPopup (popupElement) {
	document.addEventListener('keydown', handleClose);
	popupElement.classList.add('popup_is-opened');
}

export function closePopup (popupElement) {
	popupElement.classList.remove('popup_is-opened');
 }

 function handleClose() {
    console.log('click');
  }