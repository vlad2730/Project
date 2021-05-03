const Keyboard={
    elements:{
        main:null,
        keysContainer:null,
        keys:[]
    },
    eventHandlers:{
        oninput:null,
        onclose:null
    },

    properties:{
        value:"",
        capsLock:false
    },

    init() {   // метод инициализации, создаем два елемента keyboard и keyboard__keys
        // Create main elements
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div"); //для контейнера ключей

        //setup main elements
        this.elements.main.classList.add("keyboard","keyboard--hidden");    //добавляем класс keyboard n keyboard--hidden
        this.elements.keysContainer.classList.add("keyboard__keys");
        this.elements.keysContainer.appendChild(this._createKeys()); //    

        this.elements.keys=this.elements.keysContainer.querySelectorAll(".keyboard__key");  //выбираем все кнопки с этим классом 

        //Add to Dom
        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);   //добавляем дочерний елемент, чтобы добавить основную клавиатуру
        

        // Автоматически используем клавиатуру для елементов .use-keyboard-input
        document.querySelectorAll(".use-keyboard-input").forEach(element =>{
            element.addEventListener("focus", () =>{  //добавили событие для фокуса
                this.open(element.value, currentValue =>{  // открываем клавиатуру
                    element.value=currentValue;
                });
            });
        });
    },

    _createKeys(){    //создает весь HTML для каждого из ключей
       const fragment = document.createDocumentFragment();
       const keyLayout= [
           "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
           "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
           "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",
           "done", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?",
           "space"
       ];

       //Creates Html for an icon, создаем html для иконок клавиатуры

       const createIconHTML = (icon_name)=>{  //создаем переменную равную функуции и вернет строку html, сгенерируем кнопки
           return `<i class="material-icons">${icon_name}</i> `;
       };

       keyLayout.forEach(key =>{    //перебираем каждый елемент из этих кнопок 
           const keyElement = document.createElement("button");  // создаем фактический елемент кнопки 
           const insertLineBreak = ["backspace", "p", "enter", "?"].indexOf(key) !== -1;  // создает разрывы строки вниз между этими елементами и перебирает их
        
          //add attributes/classes
          keyElement.setAttribute("type", "button");  //устанавливаем тип для кнопки и имитируем создание 
          keyElement.classList.add("keyboard__key");   // добавляем классы для клавиш клавиатуры

          switch (key){
                case "backspace":
                  keyElement.classList.add("keyboard__key--wide");
                  keyElement.innerHTML = createIconHTML("backspace");

                  keyElement.addEventListener("click", ()=>{
                      this.properties.value=this.properties.value.substring(0, this.properties.value.length - 1); //удаляем последний символ из текущего значения
                      this._triggerEvent("oninput");  // вызываем обработчик для уведомления кода, об изменении ввода
                  });
                      
                  break; 


                case "caps":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                    keyElement.innerHTML = createIconHTML("keyboard_capslock");
  
                    keyElement.addEventListener("click", ()=>{
                        this._toggleCapsLock(); // переключение заглавных букв не блокируется
                        keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);  // включает или выключает этот класс, если текущее состояние являеться true
                    });
                        
                    break; 

                case "enter":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("keyboard_return");
  
                    keyElement.addEventListener("click", ()=>{
                        this.properties.value += "\n"; // добавляем разрыв строки
                        this._triggerEvent("oninput");
                    });
                        
                    break; 

                case "space":
                    keyElement.classList.add("keyboard__key--extra-wide");
                    keyElement.innerHTML = createIconHTML("space_bar");
  
                    keyElement.addEventListener("click", ()=>{
                        this.properties.value += " "; // добавляем пробел
                        this._triggerEvent("oninput");
                    });
                        
                    break;

                case "done": // кнопка готово запускает функцию  закрытие клавиатуру
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
                    keyElement.innerHTML = createIconHTML("check_circle");  //
  
                    keyElement.addEventListener("click", ()=>{
                        this.close(); 
                        this._triggerEvent("onclose");
                    });
                        
                    break;

                default:   //
                    keyElement.textContent = key.toLowerCase(); //делаем буквы строчными
  
                    keyElement.addEventListener("click", ()=>{
                        this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();  //если включен CapsLock мы запускаем ключ к верхнему регистру иначе запускаем ключ к нижнему регистру
                        this._triggerEvent("oninput");  //событие ввода
                    });
                        
                    break;

          }
          fragment.appendChild(keyElement);  //контейнер для хранение всех ключей

          if (insertLineBreak){
              fragment.appendChild(document.createElement("br"));  //создаем елемент разрыва строки
          }
       });

       return fragment;
    },

    _triggerEvent(handlerName){   //3 ф-ия вызывается триггером вызывая одно из этих двух событий
        if (typeof this.eventHandlers[handlerName] == "function"){
            this.eventHandlers[handlerName](this.properties.value);  //предоставляем текущее значение клавиатуры
        }
    },

    _toggleCapsLock(){  //переключает на заглавные буквы 
        this.properties.capsLock=!this.properties.capsLock;  //изменяем текущее состояние capsLock

        for(const key of this.elements.keys){
            if(key.childElementCount ===0){
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase(); //перебираем все ключи в методе capsLOck
            }
        }

    },

    open(initialValue, oninput, onclose){   //в открытом состоянии он будет содержать 3 аргумента,что бы передавать 2 ф-ии для собития.Также собираемся принять и начальные значения для клавиатуры когда она открывается,а также ввод и закрытие  
        this.properties.value = initialValue || "";  //значение равно начальному переданному значению и если оно не передано, то записываем пустую строку
        this.eventHandlers.oninput=oninput;
        this.eventHandlers.onclose=onclose;
        this.elements.main.classList.remove("keyboard--hidden");  //удаляем класс 
        

    },

    close(){
        this.properties.value="";  // значение равно пустой строке 
        this.eventHandlers.oninput=oninput;  //сбрасуем обработчики при закрытии
        this.eventHandlers.onclose=onclose;
        this.elements.main.classList.add("keyboard--hidden");  // скрывает клавиатуру экрана

    }
};

window.addEventListener("DOMContentLoaded", function () {   //событие загрузки содержимого Dom
    Keyboard.init();     // вызываем метод init когда страницаили структура кода HTML или Dom загружены полностью
    Keyboard.open('', function (value) {
        let arr=value.split('');
        arr.forEach((el, i) => {
            setTimeout(() => {
              console.log(el)
            }, (i + 1) * 1000)
          })
        
        // console.log(arr);
    });
    
});
document.querySelector('.use-keyboard-input').onclick=function( value){

   console.log(value);
};





