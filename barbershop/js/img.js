// Скрипт для коллекции изображений на странице товара

var bigImage = document.querySelector('.photo-big');

var smallItemImage = document.querySelectorAll('.product-photo-preview li img');
for(var i = 0; i < smallItemImage.length; i++){
	smallItemImage[i].addEventListener('click', function(){
		var srcImage = this.src;
		var newSrc = srcImage.replace(/small/g , 'big');
		bigImage.src = newSrc; 
	})
}