document.getElementById('searchButton').addEventListener('click', searchProducts);

function searchProducts() {
    var searchTerm = document.getElementById('searchInput').value.toLowerCase();
    var productTitles = document.querySelectorAll('.product-title');

    productTitles.forEach(function(title) {
        var productBox = title.closest('.product-box');
        var titleText = title.textContent.toLowerCase();

        if (titleText.includes(searchTerm)) {
            productBox.style.display = 'block';
        }else{
            productBox.style.display = 'none';
        }
    });
}
document.getElementsByClassName('cancel')[0].addEventListener('click', cerrar)
function cerrar(){
    document.getElementsByClassName('searchTogle')[0].classList.toggle('active');
}

function sortProducts(){
    var sortOption = document.getElementById('sortPrice').value
    var productList = document.querySelector('.shop-content')
    var productBoxes = Array.from(productList.getElementsByClassName('product-box'))
            
    productBoxes.sort(function(a, b){
        var precioA = parseFloat(a.querySelector('.price').innerText.replace('$', ''))
        var precioB = parseFloat(b.querySelector('.price').innerText.replace('$', ''));

        if (sortOption === 'desc') {
            return precioB - precioA;
        } else if (sortOption === 'asc') {
            return precioA - precioB;
        } else {
            return 0;
        }
    });

    // Vuelve a agregar los productos ordenados al contenedor
    productList.innerHTML = '';
    productBoxes.forEach(function(productBox) {
        productList.appendChild(productBox);
    });
    }