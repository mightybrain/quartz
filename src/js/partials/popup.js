(function(){

    const popupButtons = document.querySelectorAll(".js-popup-button");

    if(popupButtons){

        for(let i = 0; i < popupButtons.length; i++){
            popupButtons[i].addEventListener("click", showPopup);
        };

    };

    function showPopup(){

        let targetPopupName = this.getAttribute("data-for");
        let targetPopup = document.querySelector("[data-popup=" + targetPopupName + "]");

        if(targetPopup){
            document.body.classList.add("js-popup-is-open");
            targetPopup.classList.add("js-popup-is-active");
        };

    };

    const closePopupButton = document.querySelector(".js-close-popup-button");

    if(closePopupButton){
        closePopupButton.addEventListener("click", closePopup);
    };

    function closePopup(){

        let openedPopup = document.querySelector(".js-popup-is-active");

        if(openedPopup){
            openedPopup.classList.remove("js-popup-is-active");
        };
        
        document.body.classList.remove("js-popup-is-open");
    };

})();