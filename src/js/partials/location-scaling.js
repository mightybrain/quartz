(function(){

    const scalingContainer = document.querySelector(".js-scaling-container");
    const scalingElement = document.querySelector(".js-scaling");

    let scalingEnable = false;

    function calcHeight(element){

        if(element){
            return (window.pageYOffset + element.getBoundingClientRect().bottom) - (window.pageYOffset + element.getBoundingClientRect().top);
        };

    };

    window.addEventListener("scroll", function(){

        if(scalingEnable){
            changeScale(scalingContainer, scalingElement);
        };

    });

    window.addEventListener("load", checkScaling);
    window.addEventListener("resize", checkScaling);

    function checkScaling(){

        if(document.documentElement.clientWidth > 600){

            scalingEnable = true;
            changeScale(scalingContainer, scalingElement);

        }else if(document.documentElement.clientWidth < 600){

            scalingEnable = false;

            if(scalingElement.classList.contains("js-scale-2")){
                scalingElement.classList.remove("js-scale-2");
            };
            if(scalingElement.classList.contains("js-scale-3")){
                scalingElement.classList.remove("js-scale-3");
            };

        };
    };

    function changeScale(container, element){
        if(container && element){

            let containerHeight = calcHeight(container);

            if(container.getBoundingClientRect().top < (-containerHeight/4) && container.getBoundingClientRect().top > (-containerHeight/4 * 2)){

                element.classList.add("js-scale-2");
                if(element.classList.contains("js-scale-3")){
                    element.classList.remove("js-scale-3");
                };

            }else if(container.getBoundingClientRect().top < (-containerHeight/4 * 2)){

                element.classList.add("js-scale-3");
                if(element.classList.contains("js-scale-2")){
                    element.classList.remove("js-scale-2");
                };

            }else if(container.getBoundingClientRect().top > (-containerHeight/4)){

                if(element.classList.contains("js-scale-3")){
                    element.classList.remove("js-scale-3");
                };
                
                if(element.classList.contains("js-scale-2")){
                    element.classList.remove("js-scale-2");
                };

            };

        };
    };

})();