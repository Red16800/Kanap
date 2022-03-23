//SearchParams (aperçu de l'url)
var str = window.location.href;
console.log(str);
var url = new URL(str);
var idProduct = url.searchParams.get("id");
console.log(idProduct); //id du produit

//constante couleur et quantité
const productColor = document.querySelector ('#color');
const productQuantity = document.querySelector('#quantity');

//Recupération de l'API
getArticle();

function getArticle() {
    fetch("http://localhost:3000/api/products/" + idProduct)
    .then((res) => {
        return res.json();
    })

    .then(async function (resultatAPI){
        article = await resultatAPI;
        console.log(article); //info du produit
        if (article){
            getPost(article);
        }
    })
}

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
       console.log(colors); //aperçu des couleurs
    let productColor = document.createElement("option");
    document.querySelector("#colors").appendChild(productColor);
    productColor.innerHTML = colors;
    productColor.value = colors;
   }

}

//gestion du panier
