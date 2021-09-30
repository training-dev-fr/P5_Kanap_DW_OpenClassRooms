
# P5-Kanap - Construisez un site e-commerce en JavaScript

<p align="center">
  <img src="https://user.oc-static.com/upload/2021/09/29/16329291678171_image2.png">
</p>

## Backend
Le dossier back permet de faire tourner l'api contenant les données des produits.
### Installation
Il suffit de se positionner dans le dossier backend avec un terminal et de saisir la commande ```npm install```
### Lancement du serveur
Il suffit de se positionner dans le dossier backend avec un terminal et de saisir la commande ```node start```
Par défaut le serveur sera lancé sur le port 3000 ( http://localhost:3000 )
### Route api
Il y a 3 routes disponibles sur le serveur : 

#### GET /api/products/
Permet de récupérer l'ensemble des produits disponibles
#### GET /api/products/{id}
{id} : identifiant unique d'un produit
Permet de récupérer un produit par son identifiant
#### POST /api/products/order
Envoie une commande pour l'enregistrer
La commande envoyé doit être au format JSON suivant : 

    {
	    contact{
		    firstName: <string>,
		    lastName: <string>,
		    address: <string>,
		    city; <string>,
		    email: <string>
		},
		products: [<string>]
	}
	
products étant un tableau d'id produit.

## Frontend
Le frontend présente la partie utilisateur de l'application. Il doit être lancé avec un serveur local (live server avec vscode par exemple), et nécessite que le backend soit lancé lui aussi pour fonctionner correctement.

### Config
Le fichier de config permet de définir l'adresse de base du server, avec son host, port et si un certificat ssl est utilisé ou non. 

<sub>*Attention, l'architecture utilisée dans cet exemple est un niveau bien supérieur aux attentes sur ce projet. Copier ce code entrainerait un fort risque de détection de plagiat en soutenance.*</sub>

# Training-dev

<p align="center">
	<a href="https://www.training-dev.fr" target="_blank">
  <img width="400" src="https://user-images.githubusercontent.com/75472004/135489506-7739b723-4e48-4439-a4e3-9932ee269aed.png">
	</a>
</p>
<p align="center">
  Retrouvez tous nos cours, tutos, lives et exercices sur <a href="https://www.training-dev.fr" target="_blank">training-dev.fr</a>
</p>

