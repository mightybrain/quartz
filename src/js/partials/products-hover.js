class ProductPreview{
    constructor(elem){
        this.elem = elem;
        this.init();
    }

    init(){
        this.elem.addEventListener("mouseenter", this.changeCompState);
        this.elem.addEventListener("mouseleave", this.changeCompState);
    }

    changeCompState(){
        let comp = document.querySelectorAll("[data-composition=" + this.getAttribute("data-product") + "]");
        if(comp){
            comp.forEach(function(item){
                item.classList.toggle("js-is-highlighted");
            })    
        }    
    }
}

if(document.querySelector(".js-product-preview")){
    document.querySelectorAll(".js-product-preview").forEach(function(item){
        new ProductPreview(item);
    })
}