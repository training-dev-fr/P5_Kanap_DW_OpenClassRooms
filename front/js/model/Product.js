/**
 * Classe représentant un produit
 */
export default class Product {
    /**
     * Construit un objet Product à partir d'un objet anonyme (provenant d'une api ou d'un json par exemple)
     * @param {Object} productJson 
     */
    constructor(productJson) {
        this && Object.assign(this, productJson);
    }

    /**
     * Convertit un produit en chaine html pour affichage
     * @returns {String} html du produit
     */
    toHtml() {
        return `<a href="html/product.html?id=${this._id}">
                    <article>
                    <img src="${this.imageUrl}" alt="Photographie d'un canapé Kanap ${this.name}">
                    <h3>${this.name}</h3>
                    <p>${this.description}</p>
                    </article>
                </a>`;
    }

    /**
     * Convertit un produit en chaine html pour affichage dans le panier
     * @returns {String} html du produit pour le panier
     */
    toCartHtml() {
        return `<article class="cart__item" data-id="${this._id}" data-color="${this.color}">
                    <div class="cart__item__img">
                        <img src="${this.imageUrl}" alt="Photographie d'un canapé ${this.name}">
                    </div>
                    <div class="cart__item__content">
                        <div class="cart__item__content__titlePrice">
                            <h2>${this.name}</h2>
                            <p>${this.price.toFixed(2)} €</p>
                            <p>${this.color}</p>
                        </div>
                        <div class="cart__item__content__settings">
                            <div class="cart__item__content__settings__quantity">
                                <p>Qté : </p>
                                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${this.quantity}">
                            </div>
                            <div class="cart__item__content__settings__delete">
                                <p class="deleteItem" id="[item_Id]">Supprimer</p>
                            </div>
                        </div>
                    </div>
                </article>`
    }

    /**
     * Calcule le prix total d'un produit
     * @returns {int} Prix total du produit
     */
    getTotalPrice() {
        return this.price * this.quantity;
    }
}