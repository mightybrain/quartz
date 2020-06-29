(function(){

    const products = document.querySelectorAll(".js-product-preview");
    
    if(products){

        for(let i = 0; i < products.length; i++){
            products[i].addEventListener("mouseenter", changeCompState);
            products[i].addEventListener("mouseleave", changeCompState)
        };

    };

    function changeCompState(){

        let hoveredProduct = this.getAttribute("data-product");
        let productComp = document.querySelector("[data-composition=" + hoveredProduct + "]");
        
        if(productComp){
            productComp.classList.toggle("js-is-highlighted");
        };
        
    };
    
})();