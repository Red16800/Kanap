//Appel du local Storage
let articleLocalStorage = JSON.parse(localStorage.getItem("produit"));
//console.log(articleLocalStorage);

//Recuperation des produits dans le local storage
getPanier();
function getPanier(){
   for (let produit in articleLocalStorage) {

       // ajout <article>
       let productArticle = document.createElement("article");
       document.querySelector("#cart__items").appendChild(productArticle);
       productArticle.className = "cart__item";
       //console.log(productArticle);

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
   //console.log(totalQtt);

    // Ajout du prix total
    totalPrice = 0;

    for (var i = 0; i < myLength; ++i) {
        totalPrice += (elemsQtt[i].valueAsNumber * articleLocalStorage[i].productPrice);
    }

    let productTotalPrice = document.getElementById('totalPrice');
    productTotalPrice.innerHTML = totalPrice;
    //console.log(totalPrice);
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

//Ajout du formulaire
getForm();
function getForm() {
    let form = document.querySelector(".cart__order__form");
    //console.log(form);

    //modification du Prenom
    form.firstName.addEventListener('change', function() {
        validPrenom(this);
    });

    //modification du nom
    form.lastName.addEventListener('change', function(){
        validNom(this);
    });

      //modification de l'adresse
      form.address.addEventListener('change', function(){
        validAdresse(this);
    });

      //modification de la ville
      form.city.addEventListener('change', function(){
        validVille(this);
    });

      //modification de l'email
      form.email.addEventListener('change', function(){
        validEmail(this);
    });

    //Validation du prenom
    const validPrenom = function(inputFirstName){
        //creation de la regExp pour la validation du prenom
        let prenomRegExp = new RegExp("^[a-zA-Z ,.'-]+$");

        let testPrenom = prenomRegExp.test(inputFirstName.value);
    console.log(testPrenom);
    let firstNameErrorMsg = inputFirstName.nextElementSibling;

    if(testPrenom){
        firstNameErrorMsg.innerHTML = 'Prenom valide';
    }
    else{
        firstNameErrorMsg.innerHTML = 'Prenom non valide';
    }

    };
    //Validation du nom
    const validNom = function(inputLastName){
        //creation de la regExp pour la validation du nom
        let nomRegExp = new RegExp("^[a-zA-Z ,.'-]+$");

        let testNom = nomRegExp.test(inputLastName.value);
    console.log(testNom);
    let lastNameErrorMsg = inputLastName.nextElementSibling;

    if(testNom){
        lastNameErrorMsg.innerHTML = 'Nom valide';
    }
    else{
        lastNameErrorMsg.innerHTML = 'Nom non valide';
    }

    };

     //Validation de l'adresse
     const validAdresse = function(inputAddress){
        //creation de la regExp pour la validation du nom
        let adresseRegExp = new RegExp('^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+');

        let testAdresse = adresseRegExp.test(inputAddress.value);
    console.log(testAdresse);
    let addressErrorMsg = inputAddress.nextElementSibling;

    if(testAdresse){
        addressErrorMsg.innerHTML = 'Adresse valide';
    }
    else{
        addressErrorMsg.innerHTML = 'Adresse non valide';
    }

    };

    //Validation de la ville
    const validVille = function(inputCity){
        //creation de la regExp pour la validation du nom
        let villeRegExp = new RegExp("^[a-zA-Z ,.'-]+$");

        let testVille = villeRegExp.test(inputCity.value);
    console.log(testVille);
    let cityErrorMsg = inputCity.nextElementSibling;

    if(testVille){
        cityErrorMsg.innerHTML = 'Ville valide';
    }
    else{
        cityErrorMsg.innerHTML = 'Ville non valide';
    }

    };

    //Validation de l'email
    const validEmail = function(inputEmail){
        //creation de la regExp pour la validation email
        let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
        let testEmail = emailRegExp.test(inputEmail.value);
    console.log(testEmail);
    let emailErrorMsg = inputEmail.nextElementSibling;

    if(testEmail){
        emailErrorMsg.innerHTML = 'Adresse Email valide';
    }
    else{
        emailErrorMsg.innerHTML = 'Adresse Email non valide';
    }
    };

}

//fenêtre pop-up
const popupConfirmation = () => {
    if (window.confirm(`Votre commande est validé
        Pour consulter votre numéro de commande, cliquez sur OK`)) {
        window.location.href = "confirmation.html";
    }
}

//envoi de la commande
postForm();
function postForm(){
    const boutonCommander = document.getElementById("order");

    //evenement au moment du clic "bouton commander"
    boutonCommander.addEventListener("click", (event) => {
    
        //creation des infos de la commande
        let inputName = document.getElementById('firstName');
        let inputLastName = document.getElementById('lastName');
        let inputAdress = document.getElementById('address');
        let inputCity = document.getElementById('city');
        let inputMail = document.getElementById('email');

        // ajout d'un array  depuis le local storage
        let idProducts = [];
        for (let i = 0; i<articleLocalStorage.length;i++) {
            idProducts.push(articleLocalStorage[i].idProduit);
        }
        console.log(idProducts);

        const detailCommande = {
            contact : {
                firstName: inputName.value,
                lastName: inputLastName.value,
                address: inputAdress.value,
                city: inputCity.value,
                email: inputMail.value,
            },
            products: idProducts,
        } 
        

        const options = {
            method: 'POST',
            body: JSON.stringify(detailCommande),
            headers: {
                'Accept': 'application/json', 
                "Content-Type": "application/json" 
            },
        };

        fetch("http://localhost:3000/api/products/order", options)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            localStorage.clear();
            localStorage.setItem("orderId", data.orderId);
            popupConfirmation();
            //document.location.href = "confirmation.html";
        })

        .catch((err) => {
            alert ("Problème avec fetch : " + err.message);
        });
        })
}

  
