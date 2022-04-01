//Appel du local Storage
let articleLocalStorage = JSON.parse(localStorage.getItem("produit"));
console.log(articleLocalStorage);

//Recuperation des produits dans le local storage
getPanier();
function getPanier(){
   for (let produit in articleLocalStorage) {

       // ajout <article>
       let productArticle = document.createElement("article");
       document.querySelector("#cart__items").appendChild(productArticle);
       productArticle.className = "cart__item";
       console.log(productArticle);

       // ajout <div> cart_item_img
      let productDivImg = document.createElement("div");
      productArticle.appendChild(productDivImg);
      productDivImg.className = "cart__item__img";

      //ajout <img>
      let productImage = document.createElement("img");
      productDivImg.appendChild(productImage);
      productImage.src = articleLocalStorage[produit].productImg;
      productImage.alt = articleLocalStorage[produit].productDesc;

      //ajout cart content
      let productContent = document.createElement("div");
      productArticle.appendChild(productContent);
      productContent.className = "cart__item__content";

      //ajout cart descritpion
      let productContentDesc = document.createElement("div");
      productContent.appendChild(productContentDesc);
      productContentDesc.className = "cart__item__content__description";
     
      //Ajout Nom
      let productTitre = document.createElement("h2");
      productContentDesc.appendChild(productTitre);
      productTitre.innerHTML = articleLocalStorage[produit].productName;

      //Ajout couleur
      let productColor = document.createElement("p");
      productContentDesc.appendChild(productColor);
      productColor.innerHTML = articleLocalStorage[produit].produitCouleur;

      //ajout prix
      let productPrix = document.createElement("p");
      productContentDesc.appendChild(productPrix);
      productPrix.innerHTML = articleLocalStorage[produit].productPrice + " " + "€";
       
      //ajout cart item setting
      let productContentSetting = document.createElement("p");
      productContent.appendChild(productContentSetting);
      productContentSetting.className = "cart__item__content__settings";

      // ajout cart itemquantity
      let productSettingQuantity = document.createElement("div");
      productContentSetting.appendChild(productSettingQuantity);
      productSettingQuantity.className = "cart__item__content__settings__quantity";

      //Ajout Qté :
      let ProductQte = document.createElement("p");
      productSettingQuantity.appendChild(ProductQte);
      ProductQte.innerHTML = "Qté :" ;

      //ajout quantité
      let productQuantity = document.createElement("input");
      productSettingQuantity.appendChild(productQuantity);
      productQuantity.value =articleLocalStorage[produit].produitQuantite;
      productQuantity.className = "itemQuantity";
      productQuantity.setAttribute("type", "number");
      productQuantity.setAttribute("min", "1");
      productQuantity.setAttribute("max", "100");
      productQuantity.setAttribute("name", "itemQuantity");

      //ajout div supprimer
      let productSettingDelete = document.createElement("div");
      productContentSetting.appendChild(productSettingDelete);
      productSettingDelete.className = "cart__item__content__settings__delete";

      //ajout bouton supprimer
      let productDelete = document.createElement("p");
      productSettingDelete.appendChild(productDelete);
      productDelete.className = "deleteItem";
      productDelete.innerHTML = "Supprimer";
        
   }

}

//Ajout du total
getTotal();
function getTotal() {

    //Ajout de la quantite
    var elemsQtt = document.getElementsByClassName('itemQuantity');
    var myLength = elemsQtt.length,
    totalQtt = 0;

    for (var i = 0; i < myLength; ++i) {
        totalQtt += elemsQtt[i].valueAsNumber;
    }

    let productTotalQuantity = document.getElementById('totalQuantity');
    productTotalQuantity.innerHTML = totalQtt;
    console.log(totalQtt);

    // Ajout du prix total
    totalPrice = 0;

    for (var i = 0; i < myLength; ++i) {
        totalPrice += (elemsQtt[i].valueAsNumber * articleLocalStorage[i].productPrice);
    }

    let productTotalPrice = document.getElementById('totalPrice');
    productTotalPrice.innerHTML = totalPrice;
    console.log(totalPrice);
}

//Supprimer des produits
supprimerProduit();
function supprimerProduit() {
    //initialisation du bouton supprimer
    let btnSupprimer = document.querySelectorAll(".deleteItem");

    for (let j = 0; j < btnSupprimer.length; j++){
        btnSupprimer[j].addEventListener("click", (event) => {
            event.preventDefault();

            //suppresion de l'element id et couleur
            let idDelete = articleLocalStorage[j].idProduit;
            let colorDelete = articleLocalStorage[j].produitCouleur;

            articleLocalStorage = articleLocalStorage.filter( el => el.idProduit !== idDelete || el.produitCouleur != colorDelete);

            localStorage.setItem("produit", JSON.stringify(articleLocalStorage));

            //Actualisation apres modification
            location.reload();
        })
    }
}

//Modifications des produits
modifierProduit();
function modifierProduit() {
    //initialisation du bouton modifier
    let btnModifier = document.querySelectorAll(".itemQuantity");

    for (let r = 0; r < btnModifier.length; r++){
        btnModifier[r].addEventListener("change", (event) => {
            event.preventDefault();

            //modification de l'element quantité
            let modifQuantite = articleLocalStorage[r].produitQuantite;
            let modifQuantiteValue = btnModifier[r].valueAsNumber;

            const resultatFind = articleLocalStorage.find(
                (el) => el.modifQuantiteValue != modifQuantite );
                
                resultatFind.produitQuantite =modifQuantiteValue;
                articleLocalStorage[r].produitQuantite = resultatFind.produitQuantite;

            localStorage.setItem("produit", JSON.stringify(articleLocalStorage));

            //Actualisation apres modification
            location.reload();
        })
    }
}