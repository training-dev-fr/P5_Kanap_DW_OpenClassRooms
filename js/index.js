import Config from './model/Config.js';
import Product from './model/Product.js';

/**
 * Affiche les produits sur la page d'accueil
 */
async function loadProduct() {
    let config = await Config.getConfig();
    let result = await fetch(config.getServerPath());
    let listProduct = await result.json();
    let listItem = document.querySelector("#items");
    for (let product of listProduct) {
        product = new Product(product);
        listItem.insertAdjacentHTML("beforeend", product.toHtml());
    }
}

loadProduct();