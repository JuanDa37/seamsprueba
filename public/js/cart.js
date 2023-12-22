const payBtn = document.querySelector('.btn-button');

//evento para rrecopilar los seleccionados en memoria y mandarlos al banckend a la pasarela
payBtn.addEventListener("click", () => {
    fetch("/stripe-checkout", {
        method: "post",
        headers: new Headers({"Content-Type": "application/Json"}),
        body:JSON.stringify({
            items: JSON.parse(localStorage.getItem("cartItems")),
        }),
    })
    .then((res) => res.json())
    .then((url) => {
        location.href = url;
        cleartCart();
    })
    .catch((err) => console.log(err));
});