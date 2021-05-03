// Скрипт для работы c модальными окнами

(function(){

	var link = document.querySelector('.login-link');
	var popap = document.querySelector('.modal-login');
	var overlay = document.querySelector('.modal-overlay-login');
	var close = document.querySelector('.modal-close-login');
	var login = popap.querySelector('[name=login]');
	var password = popap.querySelector('[name=password]');
	var form = popap.querySelector('.login-form');
	var storage = localStorage.getItem('login')

	link.addEventListener('click',function(event){
		event.preventDefault();
		popap.classList.add('modal-show');
		overlay.classList.add('overlay-show');
		login.focus();

		if (storage) {
			login.value = storage;
			password.focus();
		} else {
			login.focus();
		}
	})

	close.addEventListener('click',function(event){
		event.preventDefault();
		popap.classList.remove('modal-show');
		overlay.classList.remove('overlay-show');
		login.nextElementSibling.innerHTML = '';
		password.nextElementSibling.innerHTML = '';
		login.nextElementSibling.classList.remove('error-message');
		login.classList.remove('error-background');
		password.nextElementSibling.classList.remove('error-message');
		password.classList.remove('error-background');
	})

	overlay.addEventListener('click',function(){
		popap.classList.remove('modal-show');
		this.classList.remove('overlay-show');
		login.nextElementSibling.innerHTML = '';
		password.nextElementSibling.innerHTML = '';
		login.nextElementSibling.classList.remove('error-message');
		login.classList.remove('error-background');
		password.nextElementSibling.classList.remove('error-message');
		password.classList.remove('error-background');
	})

	document.addEventListener('keydown',function(event){
		if(event.keyCode === 27){
			popap.classList.remove('modal-show');
			overlay.classList.remove('overlay-show');
			login.nextElementSibling.innerHTML = '';
			password.nextElementSibling.innerHTML = '';
			login.nextElementSibling.classList.remove('error-message');
			login.classList.remove('error-background');
			password.nextElementSibling.classList.remove('error-message');
			password.classList.remove('error-background');
		}
	})

	form.addEventListener('submit',function(event){

		var pattern = /^[A-Za-z\d]+$/;

		if(!login.value){

			event.preventDefault();
			login.nextElementSibling.innerHTML = 'Введите логин!';
			login.nextElementSibling.classList.add('error-message');
			login.classList.add('error-background');

		} else {

			var loginResult = pattern.test(login.value);

			if(!loginResult){
				event.preventDefault();

				login.nextElementSibling.innerHTML = 'Только латинские буквы или цифры!';
				login.nextElementSibling.classList.add('error-message');
				login.classList.add('error-background');
			}

			localStorage.setItem('login',login.value);
		}

		if(!password.value){

			event.preventDefault();

			password.nextElementSibling.innerHTML = 'Введите пароль!';
			password.nextElementSibling.classList.add('error-message');
			password.classList.add('error-background');

		} else {

			var passwordResult = pattern.test(password.value);

			if(!passwordResult){
				event.preventDefault();

				password.nextElementSibling.innerHTML = 'Только латинские буквы или цифры!';
				password.nextElementSibling.classList.add('error-message');
				password.classList.add('error-background');
			}

		}
	})
})();