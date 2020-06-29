(function(){

    const mapContainer = document.querySelector(".js-map-container");
    const mapButton = document.querySelector(".js-map-button");

    if(mapContainer && mapButton){
        mapButton.addEventListener("click", changeMapState);
    };

    function changeMapState(){
        mapContainer.classList.toggle("js-map-is-visible");
    };

})();