var element=document.getElementById('appointment-phone');
var maskOptions={
    mask: '+380-(00)000-00-00',
    lazy:false
}
var mask= new IMask(element, maskOptions);