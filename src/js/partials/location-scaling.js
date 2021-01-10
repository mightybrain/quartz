const scalingContainer = document.querySelector(".js-scaling-container");
const scalingElement = document.querySelector(".js-scaling");

if(scalingContainer && scalingElement){
    window.scalingEnable = false;
    checkScaling();

    window.addEventListener("load", function(){
        if(window.scalingEnable){
            changeScale(scalingContainer, scalingElement);
        }
    })

    window.addEventListener("scroll", function(){
        if(window.scalingEnable){
            changeScale(scalingContainer, scalingElement);
        }
    })

    window.addEventListener("resize", function(){
        checkScaling();
        if(window.scalingEnable){
            changeScale(scalingContainer, scalingElement);
        }
    })

}

function checkScaling(){

    if(document.documentElement.clientWidth > 600){
        scalingEnable = true;

    }else if(document.documentElement.clientWidth < 600){
        scalingEnable = false;

        if(scalingElement.classList.contains("js-scale-2")){
            scalingElement.classList.remove("js-scale-2");
        }
        if(scalingElement.classList.contains("js-scale-3")){
            scalingElement.classList.remove("js-scale-3");
        }

    }
}

function changeScale(container, element){
    if(!container || !element){
        return;
    }

    let containerHeight = (window.pageYOffset + container.getBoundingClientRect().bottom) - (window.pageYOffset + container.getBoundingClientRect().top)

    if(container.getBoundingClientRect().top < (-containerHeight * 0.25) && container.getBoundingClientRect().top > (-containerHeight * 0.5)){

        element.classList.add("js-scale-2");
        if(element.classList.contains("js-scale-3")){
            element.classList.remove("js-scale-3");
        }

    }else if(container.getBoundingClientRect().top < (-containerHeight * 0.5)){

        element.classList.add("js-scale-3");
        if(element.classList.contains("js-scale-2")){
            element.classList.remove("js-scale-2");
        }

    }else if(container.getBoundingClientRect().top > (-containerHeight * 0.25)){

        if(element.classList.contains("js-scale-3")){
            element.classList.remove("js-scale-3");
        }
        
        if(element.classList.contains("js-scale-2")){
            element.classList.remove("js-scale-2");
        }

    }
}

