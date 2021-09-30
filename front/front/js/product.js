import Config from './model/Config.js';
import Product from './model/Product.js';
import Basket from './manager/Basket.js';

/**
 * Affiche le produit sur la page détail et prépare l'événement pour ajout au panier
 */
async function loadProduct() {
    let id = (new URL(window.location).searchParams.get("id"));
    let config = await Config.getConfig();
    let result = await fetch(config.getServerPath() + "/" + id);
    let product = new Product(await result.json());

    let item = document.querySelector(".item");
    item.querySelector(".item__img").insertAdjacentHTML("afterbegin", `<img src="${product.imageUrl}" alt="Photographie d'un canapé ${product.name}">`);

    item.querySelector("#title").insertAdjacentHTML("afterbegin", product.name);

    item.querySelector("#price").insertAdjacentHTML("afterbegin", product.price);

    item.querySelector("#description").insertAdjacentHTML("afterbegin", product.description);

    item.querySelector("#colors").insertAdjacentHTML("beforeend", product.colors.map(color => `<option value="${color}">${color}</option>`).join());

    document.querySelector("#addToCart").addEventListener("click", function() {
        if (document.querySelector("#quantity").reportValidity() &&
            document.querySelector("#colors").reportValidity()) {
            product.quantity = parseInt(document.querySelector("#quantity").value);
            product.color = document.querySelector("#colors").value;
            Basket.add(product);
            window.location.assign("cart.html");
        }
    });
}

loadProduct();