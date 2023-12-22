var container = document.getElementById('container2')
var container2 = document.getElementById('container3')
var container3 = document.getElementById('container4')
var container4 = document.getElementById('container5')
var container5 = document.getElementById('container6')
var container6 = document.getElementById('container7')
var container7 = document.getElementById('container8')

const item  = document.getElementsByClassName('item2')

container.addEventListener('click', (e) => {
    var clickedItem = e.target.closest('.item2');
    if(clickedItem){
        clickedItem.classList.toggle('clicked');
        clickedItem.parentElement.classList.toggle('scale')
        clickedItem.children[1].classList.toggle('rotate')
    }
})
container2.addEventListener('click', (e) => {
    var clickedItem = e.target.closest('.item2');
    if(clickedItem){
        clickedItem.classList.toggle('clicked');
        clickedItem.parentElement.classList.toggle('scale')
        clickedItem.children[1].classList.toggle('rotate')
    }
})
container3.addEventListener('click', (e) => {
    var clickedItem = e.target.closest('.item2');
    if(clickedItem){
        clickedItem.classList.toggle('clicked');
        clickedItem.parentElement.classList.toggle('scale')
        clickedItem.children[1].classList.toggle('rotate')
    }
})
container4.addEventListener('click', (e) => {
    var clickedItem = e.target.closest('.item2');
    if(clickedItem){
        clickedItem.classList.toggle('clicked');
        clickedItem.parentElement.classList.toggle('scale')
        clickedItem.children[1].classList.toggle('rotate')
    }
})
container5.addEventListener('click', (e) => {
    var clickedItem = e.target.closest('.item2');
    if(clickedItem){
        clickedItem.classList.toggle('clicked');
        clickedItem.parentElement.classList.toggle('scale')
        clickedItem.children[1].classList.toggle('rotate')
    }
})
container6.addEventListener('click', (e) => {
    var clickedItem = e.target.closest('.item2');
    if(clickedItem){
        clickedItem.classList.toggle('clicked');
        clickedItem.parentElement.classList.toggle('scale')
        clickedItem.children[1].classList.toggle('rotate')
    }
})
container7.addEventListener('click', (e) => {
    var clickedItem = e.target.closest('.item2');
    if(clickedItem){
        clickedItem.classList.toggle('clicked');
        clickedItem.parentElement.classList.toggle('scale')
        clickedItem.children[1].classList.toggle('rotate')
    }
})