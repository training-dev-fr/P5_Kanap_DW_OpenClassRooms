import Product from "../model/Product.js";

/**
 * Class de gestion du panier
 */
export default class Basket {
    /**
     * Récupère le panier dans le localstorage
     * @returns {[Object]} le panier sous forme d'objet ou un tableau vide
     */
    static get() {
        let basket = localStorage.getItem("basket");
        return (basket != null) ? JSON.parse(basket) : [];
    }

    /**
     * Ajoute un produit au panier ou augmente sa quantité s'il est déjà présent
     * @param {Product} product le produit à ajouter au panier (avec au minimum un id, une couleur et une quantité)
     */
    static add(product) {
        let basket = this.get();
        let productFound = basket.find(p => p._id == product._id && p.color == product.color);
        if (productFound != null) {
            productFound.quantity += product.quantity;
            if (product.quantity > 100) {
                product.quantity = 100;
            }
        } else {
            basket.push(product);
        }
        this.save(basket);
    }

    /**
     * Modifie la quantité d'un produit dans le panier, le produit est supprimé si la quantité <= 0
     * @param {Product} product le produit à modifier au panier (avec au minimum un id, une couleur et une quantité)
     */
    static changeQuantity(product) {
        let basket = this.get();
        let productFound = basket.find(p => p._id == product._id && p.color == product.color);
        productFound.quantity = product.quantity;
        if (productFound.quantity <= 0) {
            basket = basket.filter(p => p._id != product._id || p.color != product.color);
        }
        this.save(basket);
    }

    /**
     * Enregistre le panier
     * @param {[Product]} basket le panier à enregistrer
     */
    static save(basket) {
        localStorage.setItem("basket", JSON.stringify(basket));
    }

    /**
     * Calcule le prix total du panier
     * @returns {int} le prix total du panier
     */
    static getTotalPrice() {
        if (this.get().length >= 1) {
            let basket = this.get();
            let total = 0;
            for (let product of basket) {
                product = new Product(product);
                total += product.getTotalPrice();
            }
            return total;
        } else {
            return 0;
        }
    }

    /**
     * Calcule la quantité de produit dans le panier
     * @returns {int} la quantité de produit dans le panier
     */
    static getTotalQuantity() {
        if (this.get().length >= 1) {
            return this.get().map(product => product.quantity).reduce((total, quantity) => total += quantity)
        } else {
            return 0;
        }
    }

    /**
     * Récupère les id des produits du panier
     * @returns {[string]} Un tableau contenant les id des produits du panier
     */
    static getListProductId() {
        if (this.get().length >= 1) {
            return this.get().map(product => product._id);
        } else {
            return [];
        }
    }

    /**
     * Vide le panier
     */
    static clear() {
        localStorage.removeItem("basket");
    }
}