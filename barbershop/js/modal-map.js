(function(){
	var mapLinks = document.querySelectorAll('.js-button-map');
	var openModalMap = document.querySelector('.modal-map');
	var closeModalMap = document.querySelector('.modal-close-map');
	var overlayMapModal = document.querySelector('.modal-overlay-map');

	for(var i = 0; i < mapLinks.length; i++){

		mapLinks[i].addEventListener('click',function(event){
			event.preventDefault();
			openModalMap.classList.add('modal-show');
			overlayMapModal.classList.add('overlay-show');
		})
	}

	closeModalMap.addEventListener('click',function(event){
		event.preventDefault();
		openModalMap.classList.remove('modal-show');
		overlayMapModal.classList.remove('overlay-show');
	})

	overlayMapModal.addEventListener('click',function(event){
		openModalMap.classList.remove('modal-show');
		this.classList.remove('overlay-show');
	})

	document.addEventListener('keydown',function(event){
		if(event.keyCode === 27){
			openModalMap.classList.remove('modal-show');
			overlayMapModal.classList.remove('overlay-show');
		}
	})

})()