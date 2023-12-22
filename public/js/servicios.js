var container = document.getElementById('container2')
var container2 = document.getElementById('container3')
var container3 = document.getElementById('container4')

const item  = document.getElementsByClassName('item')

ingresar(container, container2, container3)

function ingresar(container, container2, container3){
container.addEventListener('click', (e) => {
    var clickedItem = e.target.closest('.item');
    if(clickedItem){
        clickedItem.classList.toggle('clicked');
        clickedItem.parentElement.classList.toggle('scale')
        clickedItem.children[1].classList.toggle('rotate')
    }
})
container2.addEventListener('click', (e) => {
    var clickedItem = e.target.closest('.item');
    if(clickedItem){
        clickedItem.classList.toggle('clicked');
        clickedItem.parentElement.classList.toggle('scale')
        clickedItem.children[1].classList.toggle('rotate')
    }
})
container3.addEventListener('click', (e) => {
    var clickedItem = e.target.closest('.item');
    if(clickedItem){
        clickedItem.classList.toggle('clicked');
        clickedItem.parentElement.classList.toggle('scale')
        clickedItem.children[1].classList.toggle('rotate')
    }
})
}