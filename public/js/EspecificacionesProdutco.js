var container = document.getElementById('container2')
var container2 = document.getElementById('container3')
var container3 = document.getElementById('container4')

const item  = document.getElementsByClassName('item2')

container.addEventListener('click', (e) => {
    var clickedItem = e.target.closest('.item2');
    if(clickedItem){
        clickedItem.classList.toggle('clicked');
        clickedItem.parentElement.classList.toggle('scale')
        clickedItem.children[1].classList.toggle('rotate')
    }
})

/*function ingresar(container, container2, container3){
    container.addEventListener('click', (e) => {
        if(e.target.classList.contains('item')){
            e.target.parentElement.classList.toggle('scale')
            e.target.children[1].classList.toggle('rotate')
        }
    })
    /*container2.addEventListener('click', (e) => {
        if(e.target.classList.contains('item')){
            e.target.parentElement.classList.toggle('scale')
            e.target.children[1].classList.toggle('rotate')
        }
    })
    container3.addEventListener('click', (e) => {
        if(e.target.classList.contains('item')){
            e.target.parentElement.classList.toggle('scale')
            e.target.children[1].classList.toggle('rotate')
        }
    })
}*/

// Cart Open Close
let CartIcon = document.querySelector("#cart-icon");
let Cart = document.querySelector(".cart")
let CloseCart = document.querySelector("#close-cart")

const body = document.querySelector("body");
const header = document.querySelector("header");
/*const modeTogle = document.querySelector(".darkLight")*/
const sidebarOpen = document.querySelector(".sidebarOpen");

const sideClose = document.querySelector(".sidebarClose");
// Selecciona los elementos necesarios
const searchTogle = document.querySelector(".searchTogle");

/*// Agrega un evento de clic al elemento .searchTogle
searchTogle.addEventListener("click", () => {
    // Alternar la clase "active" en el elemento .searchTogle
    searchTogle.classList.toggle("active");
});*/


/*let getMode = localStorage.getItem("mode");
    if(getMode && getMode === "dark-mode"){
        body.classList.add("dark");
    }*/


/*modeTogle.addEventListener("click", () => {
    modeTogle.classList.toggle("active");
    body.classList.toggle("dark");
    if(!body.classList.contains("dark")){
        localStorage.setItem("mode", "light-mode");
    }else{
        localStorage.setItem("mode", "dark-mode");
    }
})*/
sidebarOpen.addEventListener("click", ()=>{
    header.classList.toggle("active");
})

sideClose.addEventListener("click", () => {
    header.classList.remove("active");
})


//Open cart
CartIcon.onclick = () => {
    Cart.classList.add('active');
};
// Close Cart
CloseCart.onclick = () => {
    Cart.classList.remove("active");
}
if(document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded", ready);
}else{
    ready();
}
function ready(){
    var removeCartButtons = document.getElementsByClassName("cart-remove");
    for (var i = 0; i<removeCartButtons.length; i++){
        var button = removeCartButtons[i];
        button.addEventListener("click", removeCartItem);
    }
    var quantityInputs = document.getElementsByClassName("cart-quantity");
    for (var i = 0 ; i < quantityInputs.length; i++){
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChange);
    }
    var addCart = document.getElementsByClassName("add-cart");
    for (var i = 0 ; i < addCart.length; i++){
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }
    loadCartItems();
}
function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
    saveCartItems();
    updateCartIcon();
}
function quantityChange(event){
    var input = event.target;
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1;
    } 
    updateTotal();
    saveCartItems();
}
function updateTotal(){
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++){
        var CartBox = cartBoxes[i];
        var priceElement = CartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = CartBox.getElementsByClassName("cart-quantity")[0];
        var price = parseFloat(priceElement.innerText.replace("$", "")); 
        var quantity = quantityElement.value;
        total += price * quantity;

    }
    total = Math.round(total * 100)/100;
    document.getElementsByClassName("total-price")[0].innerText = "$" + total;        
    localStorage.setItem("cartTotal", total);
}
function addCartClicked(event){
    var button =event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    var price = shopProducts.getElementsByClassName("price")[0].innerText
    var ProductingImg = document.getElementsByClassName("product-img")[0].src;
    addProductToCart(title, price, ProductingImg);
    updateTotal();
    saveCartItems();
    updateCartIcon();
}
function addProductToCart(title, price, productingImg){
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box")
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemsNames = cartItems.getElementsByClassName("cart-product-title")
    for (var i = 0; i <cartItemsNames.length; i++){
        if (cartItemsNames[i].innerText == title){
            alert("Tú ya tienes añadido este producto para comprar.");
            return;
        }
    }
    var cartBoxContent = `<img src="${productingImg}" alt="" class="cart-img">
    <div class="detail-box">
        <div class="cart-product-title">${title}</div>
        <div class="cart-price">${price}</div>
        <input type="number" readonly id="" name="" value="1" class="cart-quantity">
    </div>
    <i class='bx bx-trash-alt cart-remove'></i>`;
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener("click", removeCartItem);
    cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener("change", quantityChange);
    saveCartItems();
    updateCartIcon();
}

function saveCartItems(){
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var cartItems = [];
    for (var i = 0 ; i < cartBoxes.length ; i++){
        cartBox = cartBoxes[i];
        var titleElement = cartBox.getElementsByClassName("cart-product-title")[0];
        var priceElement = Cart.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var productImg = cartBox.getElementsByClassName("cart-img")[0].src;
        var item = {
            title: titleElement.innerText,
            price: priceElement.innerText,
            quantity: quantityElement.value,
            productImg: productImg,
        };
        cartItems.push(item);
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

function loadCartItems(){
    var cartItems = localStorage.getItem("cartItems");
    if(cartItems){
        cartItems = JSON.parse(cartItems);
        for(var i = 0 ; i < cartItems.length ; i++){
            var item = cartItems[i];
            addProductToCart(item.title, item.price, item.productImg);
            var cartBoxes = document.getElementsByClassName("cart-box");
            var cartBox = cartBoxes[cartBoxes.length -1];
            var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
            quantityElement.value = item.quantity;
        }
    }
    var cartTotal = localStorage.getItem("cartTotal");
    if(cartTotal){
        document.getElementsByClassName("total-price")[0].innerText = "$" + cartTotal;
    }
    updateCartIcon();
}

function updateCartIcon() {
    var cartBoxes = document.getElementsByClassName("cart-box");
    var quantity = 0;

    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        quantity += parseInt(quantityElement.value);
    }

    var cartIcon = document.querySelector("#cart-icon");
    cartIcon.setAttribute("data-quantity", quantity);

    // Si el carrito está vacío, establece el data-quantity en 0
    if (quantity === 0) {
        cartIcon.setAttribute("data-quantity", 0);
    }
}

//Clear items after the payment

function cleartCart(){
    var cartCotent = document.getElementsByClassName("cart-content")[0];
    cartCotent.innerHTML = "";
    updateTotal();
    localStorage.removeItem("cartItems");
}
