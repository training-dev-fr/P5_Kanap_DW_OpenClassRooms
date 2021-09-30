import Config from './model/Config.js';
import Product from './model/Product.js';
import Basket from './manager/Basket.js';

/**
 * Affiche les produits dans le panier et prépare les événements
 */
async function loadProduct() {
    let id = (new URL(window.location).searchParams.get("id"));

    let listItem = document.querySelector("#cart__items");
    for (let product of Basket.get()) {
        product = new Product(product);
        listItem.insertAdjacentHTML("beforeend", product.toCartHtml());
    }

    displayTotal();
    document.querySelectorAll(".itemQuantity").forEach(quantityButton => {
        quantityButton.addEventListener("change", (e) => {
            Basket.changeQuantity({
                quantity: parseInt(e.target.value),
                color: e.target.closest(".cart__item").dataset.color,
                _id: e.target.closest(".cart__item").dataset.id
            });
            if (parseInt(e.target.value) == 0) {
                e.target.closest(".cart__item").remove();
            }
            displayTotal();
        });
    })
    document.querySelector(".cart__order__form").addEventListener("submit", async function(e) {
        e.preventDefault();
        if (this.reportValidity()) {
            let config = await Config.getConfig();
            let result = await fetch(`${config.getServerPath()}/order`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contact: {
                        firstName: this.querySelector('[name="firstName"]').value,
                        lastName: this.querySelector('[name="lastName"]').value,
                        address: this.querySelector('[name="address"]').value,
                        city: this.querySelector('[name="city"]').value,
                        email: this.querySelector('[name="email"]').value
                    },
                    products: Basket.getListProductId()
                })
            });
            let data = await result.json();
            document.querySelector("#cartAndFormContainer").classList.add("hide");
            document.querySelector("#orderId").innerHTML = data.orderId;
            document.querySelector(".confirmation").classList.remove("hide");
            Basket.clear();

        }
    });
}

/**
 * Affiche le prix total et la quantité de produit dans le panier
 */
function displayTotal() {
    document.querySelector("#totalQuantity").innerHTML = (Basket.getTotalQuantity());
    document.querySelector("#totalPrice").innerHTML = (Basket.getTotalPrice().toFixed(2));
}

loadProduct();