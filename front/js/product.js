//SearchParams (aperçu de l'url)
var str = window.location.href;
//console.log(str);
var url = new URL(str);
var idProduct = url.searchParams.get("id");
//console.log(idProduct); //id du produit

//constante couleur et quantité
const productColor = document.querySelector ('#colors');
const productQuantity = document.querySelector('#quantity');

//Recupération de l'article dans l'API
getArticle();

function getArticle() {
    fetch("http://localhost:3000/api/products/" + idProduct)
    .then((result) => {
        return result.json();
    })

    .then(async function (resultatAPI){
        article = await resultatAPI;
        //console.log(article); //info du produit
        if (article){
            getPost(article);
        }
    })
}
// répartition des data  dans le DOM
function getPost(article){

    //ajout image 
    let productImage = document.createElement("img");
    document.querySelector(".item__img").appendChild(productImage);
    productImage.src = article.imageUrl;
    productImage.alt = article.altTxt;

    //ajout du titre
    let productTitle = document.createElement("h1");
    document.querySelector("#title").appendChild(productTitle);
    productTitle.innerHTML = article.name;

   //ajout prix
   let productPrice = document.createElement("span")
   document.querySelector("#price").appendChild(productPrice);
   productPrice.innerHTML = article.price;

   //ajout description
   let productDescription = document.createElement("p");
   document.querySelector("#description").appendChild(productDescription);
   productDescription.innerHTML = article.description;

   //ajout color
   for (let colors of article.colors) {
       //console.log(colors); //aperçu des couleurs
    let productColor = document.createElement("option");
    document.querySelector("#colors").appendChild(productColor);
    productColor.innerHTML = colors;
    productColor.value = colors;
   }

   addPanier(article);

}

//gestion du panier
function addPanier(article){
    const boutonPanier = document.querySelector("#addToCart");

//Evenement Panier - ajout conditions (quantité et couleur)
boutonPanier.addEventListener('click', function() {
    // 2 conditions valeur comprise entre 1 et 100
    if (productQuantity.value > 0 && productQuantity.value <= 100 && productColor.value != 0){ 

        //choix valeur couleur et quantité
        let choixCouleur = productColor.value;
        let choixQuantity = productQuantity.value;
        //console.log(productColor.value);

        //Détail produit
        let detailProduct = {
           productName: article.name,
           productDesc: article.description,
           productImg: article.imageUrl,
           productAlt: article.altTxt,
           productPrice: article.price,
           idProduit: idProduct,
           produitCouleur:  choixCouleur,
           produitQuantite: Number(choixQuantity), 
        };
    //local Storage (stockage des datas)
    let articleLocalStorage = JSON.parse(localStorage.getItem("produit"));

    //ajout dans le panier
    if (articleLocalStorage){
    const resultatFind = articleLocalStorage.find(
        (el) => el.idProduit === idProduct && el.produitCouleur === choixCouleur);
        
        if (resultatFind) {
            // ajout quantite dun produit similaire
            let newquantity = parseInt(detailProduct.produitQuantite) + parseInt(resultatFind.produitQuantite);
            resultatFind.produitQuantite = newquantity;
            localStorage.setItem("produit", JSON.stringify(articleLocalStorage));
            console.log(articleLocalStorage);
        }
        else {
            // ajout quantite dun produit different
            articleLocalStorage.push(detailProduct);
            localStorage.setItem("produit", JSON.stringify(articleLocalStorage));
        }
    }
    //panier vide
    else {
        articleLocalStorage = [];
        articleLocalStorage.push(detailProduct);
        localStorage.setItem("produit", JSON.stringify(articleLocalStorage));
        console.log(articleLocalStorage);
        }
    }

});

}
