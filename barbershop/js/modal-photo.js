
var linksPhoto = document.querySelectorAll('.slide a');
var imgInModal = document.querySelector('.img-big');
var openModalPhoto = document.querySelector('.modal-photo');
var overlayPhoto = document.querySelector('.modal-overlay-photo');
var closeModalPhoto = document.querySelector('.modal-close-photo');

for(var i = 0; i < linksPhoto.length; i++){
	linksPhoto[i].addEventListener('click',function(event){

		event.preventDefault();

		var srcPhoto = this.firstChild.src;

		var newSrcPhoto = srcPhoto.replace(/small/,'big');

		imgInModal.setAttribute('src',newSrcPhoto);

		openModalPhoto.classList.add('modal-show');
		overlayPhoto.classList.add('overlay-show');
	})
}

closeModalPhoto.addEventListener('click',function(event){
		event.preventDefault();
		openModalPhoto.classList.remove('modal-show');
		overlayPhoto.classList.remove('overlay-show');
	})

	overlayPhoto.addEventListener('click',function(event){
		openModalPhoto.classList.remove('modal-show');
		this.classList.remove('overlay-show');
	})

	document.addEventListener('keydown',function(event){
		if(event.keyCode === 27){
			openModalPhoto.classList.remove('modal-show');
			overlayPhoto.classList.remove('overlay-show');
		}
	})
