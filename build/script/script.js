// Свайпер
if(document.querySelector(".js-main-slider")){

    window.mainSlider = new Swiper(".js-main-slider", {
        init: false,
        speed: 1200,
        loop: false,
        direction: "horizontal",
        watchOverflow: true,
        navigation: {
            nextEl: ".js-main-slider-arrow-right",
            prevEl: ".js-main-slider-arrow-left",
        },
    })

    if(mainSlider.wrapperEl.children.length > 1){
        mainSlider.params.loop = true;
        mainSlider.init();
    }else{
        mainSlider.init();
    }
}

if(document.querySelector(".js-row-slider")){

    document.querySelectorAll(".js-row-slider").forEach(function(item){
        new Swiper(item, {
            speed: 1200,
            loop: true,
            direction: "horizontal",
            slidesPerView: "auto",
            slidesPerColumn: 1,
        })
    })
}

if(document.querySelector(".js-products-slider")){
    window.prodSliderEnable = false;
    window.prodSlider;

    window.addEventListener("load", function(){
        if(document.documentElement.clientWidth > 600){
            prodSliderInit();
            prodSliderEnable = true;
        }
    })

    window.addEventListener("resize", function(){
        if(document.documentElement.clientWidth < 600 && prodSliderEnable){
            prodSlider.destroy();
            prodSliderEnable = false;
        }else if(document.documentElement.clientWidth > 600 && !prodSliderEnable){
            prodSliderInit();
            prodSliderEnable = true;
        }
    })
}

function prodSliderInit(){

    prodSlider = new Swiper(".js-products-slider", {
        speed: 1200,
        direction: "horizontal",
        slidesPerView: "auto",
        slidesPerColumn: 1,
    })

    prodSlider.slideTo((prodSlider.wrapperEl.children.length / 2) - 1);
}


// Скрыть/показать мнею в шапке
class Burger{

    constructor(button){
        this.buttonElement = button;
        this.init();
    }

    init(){
        this.buttonElement.addEventListener("click", function(){

            document.body.classList.toggle("js-burger-menu-is-open");
            
            if(!this.classList.contains("js-burger-is-open")){
                this.classList.add("js-burger-is-open");
            }else if(this.classList.contains("js-burger-is-open")){
                this.classList.remove("js-burger-is-open");
            }

        })
    }

}

if(document.querySelector(".js-burger")){
    new Burger(document.querySelector(".js-burger"));
};


// Яндекс-карта
if(document.getElementById("map")){
    ymaps.ready(mapInit);
}

function mapInit(){ 
    let locationMap = new ymaps.Map("map", {
        center: [55.728829, 60.521423],
        zoom: 13
    })

    locationMap.geoObjects.add(
        new ymaps.Placemark([55.728829, 60.521423], {
            hintContent:"",
            balloonContent:""
        }, {
            iconLayout: "default#image",
            iconImageHref: "../images/pin.png",
            iconImageSize: [27, 35],
            iconImageOffset: [-14, -35]
        })
    )

    locationMap.behaviors.disable("scrollZoom");
    locationMap.controls.remove("searchControl");
    locationMap.controls.remove("rulerControl");
    locationMap.controls.remove("typeSelector");
    locationMap.controls.remove("trafficControl");
    locationMap.controls.remove("geolocationControl");
    locationMap.controls.remove("fullscreenControl");
    locationMap.controls.remove("routeButtonControl");
}


// Скрыть/показать карту с маршрутом
if(document.querySelector(".js-map-container") && document.querySelector(".js-map-button")){
    document.querySelector(".js-map-button").addEventListener("click", function(){
        document.querySelector(".js-map-container").classList.toggle("js-map-is-visible");
    })
}


// Прилипание для блока Location
let currentScroll = window.pageYOffset;

function checkScrollDirection(){
    if(window.pageYOffset > currentScroll){
        currentScroll = window.pageYOffset;
        return "scroll-down";

    }else if(window.pageYOffset < currentScroll){
        currentScroll = window.pageYOffset;
        return "scroll-up";
    }
    return "no-scroll";
}

class StickyElem{
    constructor(container){
        this.container = container;
        this.elem = container.querySelector(".js-sticky");
    }
}

if(document.querySelector(".js-sticky-container")){
    window.stickyElems = [];
    document.querySelectorAll(".js-sticky-container").forEach(function(item){
        window.stickyElems.push(new StickyElem(item));
    })

    window.stickyEnable = false;
    checkSticky();

    window.addEventListener("load", function(){
        if(stickyEnable){
            window.stickyElems.forEach(function(item){
                stick(item);
            })
        }
    })

    window.addEventListener("scroll", function(){
        if(stickyEnable){
            let scrollDirection = checkScrollDirection();
            window.stickyElems.forEach(function(item){
                stick(item, scrollDirection);
            })
        }
    })

    window.addEventListener("resize", function(){
        checkSticky();
        if(stickyEnable){
            window.stickyElems.forEach(function(item){
                stick(item);
            })        
        }
    })

}

function checkSticky(){
    if(document.documentElement.clientWidth > 600){
        window.stickyEnable = true;

    }else{
        window.stickyEnable = false;
        window.stickyElems.forEach(function(item){
            item.elem.style.position = "static";
        })
    }
}

function stick(stickyElem, scrollDirection){
    if(scrollDirection === "scroll-down"){

        if(stickyElem.container.getBoundingClientRect().top < 0 && stickyElem.container.getBoundingClientRect().bottom > stickyElem.elem.getBoundingClientRect().bottom){
            stickyElem.elem.style.position = "fixed";
            stickyElem.elem.style.top = 0;
            stickyElem.elem.style.bottom = "auto";

        }else if(stickyElem.container.getBoundingClientRect().top < 0 && stickyElem.container.getBoundingClientRect().bottom < stickyElem.elem.getBoundingClientRect().bottom){
            stickyElem.elem.style.position = "absolute";
            stickyElem.elem.style.top = "auto";
            stickyElem.elem.style.bottom = 0;
        }

    }else if(scrollDirection === "scroll-up"){

        if(stickyElem.container.getBoundingClientRect().bottom > document.documentElement.clientHeight && stickyElem.container.getBoundingClientRect().top < stickyElem.elem.getBoundingClientRect().top){
            stickyElem.elem.style.position = "fixed";
            stickyElem.elem.style.top = 0;
            stickyElem.elem.style.bottom = "auto";

        }else if(stickyElem.container.getBoundingClientRect().bottom > document.documentElement.clientHeight && stickyElem.container.getBoundingClientRect().top > stickyElem.elem.getBoundingClientRect().top){
            stickyElem.elem.style.position = "absolute";
            stickyElem.elem.style.top = 0;
            stickyElem.elem.style.bottom = "auto";
        }
      
    }else if(!scrollDirection){

        if(stickyElem.container.getBoundingClientRect().top < 0 && stickyElem.container.getBoundingClientRect().bottom > document.documentElement.clientHeight){
            stickyElem.elem.style.position = "fixed";
            stickyElem.elem.style.top = 0;
            stickyElem.elem.style.bottom = "auto";

        }else if(stickyElem.container.getBoundingClientRect().top > 0){
            stickyElem.elem.style.position = "absolute";
            stickyElem.elem.style.top = 0;
            stickyElem.elem.style.bottom = "auto";
            
        }else if(stickyElem.container.getBoundingClientRect().bottom < document.documentElement.clientHeight){
            stickyElem.elem.style.position = "absolute";
            stickyElem.elem.style.top = "auto";
            stickyElem.elem.style.bottom = 0;
        }
        
    }
}


// Масштабирование для блока Location
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


// Ховер на карточки продуктов с подсветкой строк в таблице состава
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


// Скрыть/показать попап
function showPopup(){

    let targetPopup = document.querySelector("[data-popup=" + this.getAttribute("data-popup-for") + "]");

    if(targetPopup){
        document.body.classList.add("js-popup-is-open");
        targetPopup.classList.add("js-active-popup");
    };
}

function hidePopup(){
    document.querySelector(".js-active-popup").classList.remove("js-active-popup");
    document.body.classList.remove("js-popup-is-open");
}

if(document.querySelector(".js-popup-button") && document.querySelector(".js-close-popup-button")){

    document.querySelectorAll(".js-popup-button").forEach(function(item){
        item.addEventListener("click", showPopup);
    });
    document.querySelector(".js-close-popup-button").addEventListener("click", hidePopup);
}


// Валидация форм
if(document.querySelector("form")){
    document.querySelectorAll("form").forEach(function(item){
        item.addEventListener("submit", validationCheck);
    })
}

function validationCheck(event){

    let elems = this.querySelectorAll("input, select, textarea");
    let errors = [];

    elems.forEach(function(item){
        let type;

        if(item.hasAttribute("type")){
            type = item.getAttribute("type");
        }else{
            type = item.getAttribute("data-type");
        }

        switch(type){

            case "text":
                if(item.value == ""){ 
                    reqCheck(item);
                }else{
                    let pattern;

                    switch(item.getAttribute("data-content")){
                        case "surname":
                        case "name":
                            pattern = new RegExp("^[a-zа-яё -]{1,}$","i");
                            contentCheck(item, item.value, pattern);
                            break;
                        case "phone":   
                            pattern = new RegExp("^[0-9 ]{7,}$");
                            contentCheck(item, item.value, pattern);
                            break;
                        case "date":   
                            pattern = new RegExp("^[0-9]{1,4}[.]{1}[0-9]{1,4}[.]{1}[0-9]{1,4}$");
                            contentCheck(item, item.value, pattern);
                            break;
                        case "mail":
                            pattern = new RegExp("^[a-z0-9_-]{1,}@{1}[a-z]{1,}[.]{1}[a-z]{2}$","i");
                            contentCheck(item, item.value, pattern);
                            break;
                    }
                }
                break;

            case "textarea":
                if(item.value == ""){ 
                    reqCheck(item);
                }else{
                    removeErrorMarks(item);
                }
                break;

            case "checkbox":
                if(!item.checked){
                    reqCheck(item);
                }else{
                    removeErrorMarks(item);
                }
                break;
        }
    })

    function reqCheck(elem){
        if(elem.hasAttribute("data-req")){
            errors.push(elem);
        }
    }

    function removeErrorMarks(elem){
        let elemParent = elem.parentElement;
        while(!elemParent.classList.contains("form__group")){
            elemParent = elemParent.parentElement;
        }
        if(elemParent.classList.contains("js-valid-error")){
            elemParent.classList.remove("js-valid-error");
        }
    }

    function contentCheck(elem, content, patrn){
        if(!patrn.test(content)){
            errors.push(elem); 
        }else{
            removeErrorMarks(elem);
        }
    }

    if(errors.length){
        event.preventDefault();

        errors.forEach(function(item){
            let elemParent = item.parentElement;
            while(!elemParent.classList.contains("form__group")){
                elemParent = elemParent.parentElement;
            }
            if(!elemParent.classList.contains("js-valid-error")){
                elemParent.classList.add("js-valid-error");
            }
        })
    }
}


// Табы
class Tabs{
    constructor(container){
        this.container = container;
        this.content = document.querySelector("[data-tabs-content=" + container.getAttribute("data-tabs") + "]");
        this.init();
    }

    init(){
        let _this = this;

        this.container.querySelectorAll("[data-tab]").forEach(function(item){
            item.addEventListener("click", function(){
                if(!this.classList.contains("js-active-tab")){
                    _this.container.querySelector(".js-active-tab").classList.remove("js-active-tab");
                    this.classList.add("js-active-tab");
                    _this.changeState();
                }
            })
        })

        if(this.container.querySelector(".js-active-tab")){
            this.changeState();
        }else{
            this.container.querySelector("[data-tab]").classList.add("js-active-tab");
            this.changeState();
        }

    }

    changeState(){

        let activeTab = this.container.querySelector(".js-active-tab");
        this.content.querySelectorAll("[data-tab-content]").forEach(function(item){

            if(item.getAttribute("data-tab-content").includes(activeTab.getAttribute("data-tab"))){ 
                item.classList.remove("js-content-is-hidden");

            }else{
                item.classList.add("js-content-is-hidden");
            }
        })
    }
}

if(document.querySelector(".js-tabs")){
    document.querySelectorAll(".js-tabs").forEach(function(item){
        new Tabs(item);
    })
}