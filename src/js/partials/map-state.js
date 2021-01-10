if(document.querySelector(".js-map-container") && document.querySelector(".js-map-button")){
    document.querySelector(".js-map-button").addEventListener("click", function(){
        document.querySelector(".js-map-container").classList.toggle("js-map-is-visible");
    })
}
