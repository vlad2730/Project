const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://raw.githubusercontent.com/David-Haim/CountriesToCitiesJSON/master/countriesToCities.json');
xhr.responseType = 'text';
xhr.send();
let recors = [];
xhr.onload = function(){
  const xhrModeText = xhr.response;
  const xhrMode = JSON.parse(xhrModeText);
  keyZona(xhrMode);
}
const selectCount = document.getElementById('country');
const selectSity = document.getElementById('city');


function keyZona(jsonObj){
  for(const key in jsonObj){
      console.log(key);
    const myOption = document.createElement('option');
    myOption.innerText = key;
    
    selectCount.append(myOption);
  }
  selectCount.onchange = () => {
   console.log(selectCount.value);
   selectSity.textContent=" ";
   for(const cityName of jsonObj[selectCount.value]){
       console.log(cityName);
       const myOption2= document.createElement('option');
       myOption2.innerText=cityName;
       selectSity.append(myOption2);
   }
  }
  console.log('BYE',jsonObj);
}