// Скрипт для валидации формы записи

(function(){
	var appointmentForm = document.querySelector('.appointment-form');
	var inputsForms = appointmentForm.querySelectorAll('input');

	appointmentForm.addEventListener('submit',function(event){
		for(var i = 0; i < inputsForms.length; i++){

			if(!inputsForms[i].value){

				event.preventDefault();

				inputsForms[i].nextElementSibling.innerHTML = 'Введите значение';
				inputsForms[i].nextElementSibling.classList.add('error-message');
				inputsForms[i].classList.add('error-background');

			} else {

				if(inputsForms[i].getAttribute('name') == 'date'){

					var result = /^\d{2}\.\d{2}\.\d{4}$/.test(inputsForms[i].value);

					if(!result){

						event.preventDefault();

						inputsForms[i].nextElementSibling.innerHTML = 'Некорректная дата' + '<br>' + '(Шаблон:08.13.2018)';
						inputsForms[i].nextElementSibling.classList.add('error-message');
						inputsForms[i].classList.add('error-background');
					}
				}

				if(inputsForms[i].getAttribute('name') == 'time'){

					var result = /^\d{2}\:\d{2}$/.test(inputsForms[i].value);

					if(!result){

						event.preventDefault();

						inputsForms[i].nextElementSibling.innerHTML = 'Некорректное время (Шаблон:08:20)';
						inputsForms[i].nextElementSibling.classList.add('error-message');
						inputsForms[i].classList.add('error-background');
					}
				}

				if(inputsForms[i].getAttribute('name') == 'name'){

					var result = /^[A-Za-zА-Яa-я]+$/.test(inputsForms[i].value);

					if(!result){

						event.preventDefault();

						inputsForms[i].nextElementSibling.innerHTML = 'Некорректное имя (Шаблон:Сергей)';
						inputsForms[i].nextElementSibling.classList.add('error-message');
						inputsForms[i].classList.add('error-background');
					}
				}

				if(inputsForms[i].getAttribute('name') == 'phone'){

					var result = /^[\d\+]\d+$/.test(inputsForms[i].value);

					if(!result){

						event.preventDefault();

						inputsForms[i].nextElementSibling.innerHTML = 'Некорректный телефон (Шаблон:89183458956)';
						inputsForms[i].nextElementSibling.classList.add('error-message');
						inputsForms[i].classList.add('error-background');
					}
				}
			}
		}
	})
})()