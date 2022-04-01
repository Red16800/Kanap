// Appel de l'API products
 async function getArticles() {
    let urlApi = await fetch('http://localhost:3000/api/products')
    return await urlApi.json();
}

//Récupération des data
test();

async function test() {
    let result = await getArticles ()
    .then(function (resultatAPI){
    const articles = resultatAPI;
    console.log(articles); 
    for (let article in articles) {
        

        //ajout lien <a>
        let productLink = document.createElement("a");
        document.querySelector(".items").appendChild(productLink);
        productLink.href = `product.html?id=${resultatAPI[article]._id}`;
        //console.log(productLink);

    
        //ajout <article>
        let productArticle = document.createElement("article");
        productLink.appendChild(productArticle);

        //ajout image <img>
        let productImage = document.createElement("img");
        productArticle.appendChild(productImage);
        productImage.src = resultatAPI[article].imageUrl;
        productImage.alt = resultatAPI[article].altTxt;
      

        //ajout titre <h3>
        let productTitle = document.createElement("h3");
        productArticle.appendChild(productTitle);
        productTitle.innerHTML = resultatAPI[article].name;

        //ajout description <p>
        let ProductDescription = document.createElement("p");
        productArticle.appendChild(ProductDescription);
        ProductDescription.innerHTML = resultatAPI[article].description;
    }
    
    })
    .catch (function(error){
        return error;
    });
}


            

