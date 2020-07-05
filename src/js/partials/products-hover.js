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
        let productComp = document.querySelectorAll("[data-composition=" + hoveredProduct + "]");
        
        if(productComp){
            for(let i = 0; i < productComp.length;i++ ){
                productComp[i].classList.toggle("js-is-highlighted");
            };
        };
        
    };
    
})();