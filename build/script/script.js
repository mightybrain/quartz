// Свайпер
(function(){

    // Основной слайдер на главной странице
    if(document.querySelector(".js-main-slider")){

        let mainSwiper = new Swiper(".js-main-slider", {
            init: false,
            speed: 1200,
            loop: false,
            direction: "horizontal",
            watchOverflow: true,
            navigation: {
                nextEl: ".js-main-slider-arrow-right",
                prevEl: ".js-main-slider-arrow-left",
            },
        });
    
        if(mainSwiper.wrapperEl.children.length > 1){
            mainSwiper.params.loop = true;
            mainSwiper.init();
        }else{
            mainSwiper.init();
        };

    };

    // Широкий слайдер с несколькими видимыми картинками
    const rowSliders = document.querySelectorAll(".js-row-slider");

    if(rowSliders){

        for(let i = 0; i < rowSliders.length; i++){
            let rowSwiper = new Swiper(rowSliders[i], {
                speed: 1200,
                loop: true,
                direction: "horizontal",
                slidesPerView: "auto",
                slidesPerColumn: 1,
            });
        };
    };

    // Слайдер продукции
    let productsSwiperEnable = false;
    let productsSwiper;

    function productsSwiperInit(){

        productsSwiper = new Swiper(".js-products-slider", {
            speed: 1200,
            direction: "horizontal",
            slidesPerView: "auto",
            slidesPerColumn: 1,
        });

        productsSwiper.slideTo((productsSwiper.wrapperEl.children.length / 2) - 1);
        productsSwiperEnable = true;
    };

    window.addEventListener("load", function(){

        if(document.documentElement.clientWidth > 600 && document.querySelector(".js-products-slider") && !productsSwiperEnable){
            productsSwiperInit();
        };

    });

    window.addEventListener("resize", function(){

        if(document.documentElement.clientWidth < 600 && productsSwiperEnable){
            productsSwiper.destroy();
            productsSwiperEnable = false;

        }else if(document.documentElement.clientWidth > 600 && document.querySelector(".js-products-slider") && !productsSwiperEnable){
            productsSwiperInit();
        };

    });
    
})();


// Скрыть/показать мнею в шапке
(function(){

    const burgerButton = document.querySelector(".burger");
    if(burgerButton){
        burgerButton.addEventListener("click", changeMenuState);
    };

    function changeMenuState(){
        document.body.classList.toggle("js-burger-menu-is-open");

        if(!burgerButton.classList.contains("js-burger-is-open")){
            burgerButton.classList.add("js-burger-is-open");
        }else if(burgerButton.classList.contains("js-burger-is-open")){
            burgerButton.classList.remove("js-burger-is-open");
        };
    };
    
})();


// Интро для главной страницы
// partials/intro.js


// Кастомные селекты
// partials/choices-initialize.js


// Яндекс-карта
// Инициализация карты Яндекс
if(document.getElementById("map")){
    ymaps.ready(init);
    function init(){ 
        let locationMap = new ymaps.Map("map", {
            center: [55.728829, 60.521423],
            zoom: 13
        }),
    
        MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
            '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
        ),
        
        mainPin = new ymaps.Placemark([55.728829, 60.521423], {
            hintContent:"",
            balloonContent:""
        }, {
            iconLayout: "default#image",
            iconImageHref: "../images/pin.png",
            iconImageSize: [27, 35],
            iconImageOffset: [-14, -35]
        });
 
        locationMap.geoObjects
            .add(mainPin)

        if(locationMap.container._parentElement.classList.contains("js-scroll-lock")){
            locationMap.behaviors.disable("scrollZoom");
        };
        locationMap.controls.remove("searchControl");
        locationMap.controls.remove("rulerControl");
        locationMap.controls.remove("typeSelector");
        locationMap.controls.remove("trafficControl");
        locationMap.controls.remove("geolocationControl");
        locationMap.controls.remove("fullscreenControl");
        locationMap.controls.remove("routeButtonControl");
    };    
};


// Скрыть/показать карту с маршрутом
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


// Прилипание для блока Location
(function(){

    let currentScroll = window.pageYOffset;
    let scrollDelta;

    function checkScrollDirection(){

        let newScroll = window.pageYOffset;

        if(newScroll > currentScroll){
            currentScroll = window.pageYOffset;
            scrollDelta = -1;

        }else if(newScroll < currentScroll){
            currentScroll = window.pageYOffset;
            scrollDelta = 1;

        }else if(newScroll == currentScroll){
            scrollDelta = 0;
        };

    };

    const stickyContainer = document.querySelector(".js-sticky-container");
    const stickyElement = document.querySelector(".js-sticky");
    
    let stickyEnable = false;

    if(stickyContainer && stickyElement){
        window.addEventListener("scroll", function(){

            if(stickyEnable){
                stick(stickyContainer, stickyElement);
            };
    
        });
    
        window.addEventListener("load", checkSticky);
        window.addEventListener("resize", checkSticky);
        
    };


    function checkSticky(){

        if(document.documentElement.clientWidth > 600){
            stickyEnable = true;
            stick(stickyContainer, stickyElement);

        }else if(document.documentElement.clientWidth < 600){
            stickyEnable = false;
            stickyElement.style.position = "static";
        };

    };

    function stick(container, element){

        checkScrollDirection();

        if(container && element){

            if(scrollDelta < 0){

                if(container.getBoundingClientRect().top < 0 && container.getBoundingClientRect().bottom > element.getBoundingClientRect().bottom){

                    element.style.position = "fixed";
                    element.style.top = 0;
                    element.style.bottom = "auto";

                }else if(container.getBoundingClientRect().top < 0 && container.getBoundingClientRect().bottom < element.getBoundingClientRect().bottom){
                    element.style.position = "absolute";
                    element.style.top = "auto";
                    element.style.bottom = 0;
                };

            }else if(scrollDelta > 0){

                if(container.getBoundingClientRect().bottom > document.documentElement.clientHeight && container.getBoundingClientRect().top < element.getBoundingClientRect().top){

                    element.style.position = "fixed";
                    element.style.top = 0;
                    element.style.bottom = "auto";

                }else if(container.getBoundingClientRect().bottom > document.documentElement.clientHeight && container.getBoundingClientRect().top > element.getBoundingClientRect().top){
                    element.style.position = "absolute";
                    element.style.top = 0;
                    element.style.bottom = "auto";
                };
              
            }else if(scrollDelta == 0){

                if(container.getBoundingClientRect().top < 0 && container.getBoundingClientRect().bottom > document.documentElement.clientHeight){

                    element.style.position = "fixed";
                    element.style.top = 0;
                    element.style.bottom = "auto";

                }else if(container.getBoundingClientRect().top > 0){
                    element.style.position = "absolute";
                    element.style.top = 0;
                    element.style.bottom = "auto";
                    
                }else if(container.getBoundingClientRect().bottom < document.documentElement.clientHeight){
                    element.style.position = "absolute";
                    element.style.top = "auto";
                    element.style.bottom = 0;
                };
                
            };
        };
    };

})();


// Масштабирование для блока Location
(function(){

    const scalingContainer = document.querySelector(".js-scaling-container");
    const scalingElement = document.querySelector(".js-scaling");

    let scalingEnable = false;

    function calcHeight(element){

        if(element){
            return (window.pageYOffset + element.getBoundingClientRect().bottom) - (window.pageYOffset + element.getBoundingClientRect().top);
        };

    };

    if(scalingContainer && scalingElement){
        window.addEventListener("scroll", function(){

            if(scalingEnable){
                changeScale(scalingContainer, scalingElement);
            };
    
        });
    
        window.addEventListener("load", checkScaling);
        window.addEventListener("resize", checkScaling);

    };


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


// Ховер на карточки продуктов с подсветкой строк в таблице состава
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


// Скрыть/показать попап
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


// Валидация форм
(function () {

    //Валидация форм
    function validationCheck(){

        // Проверка на обязательность заполнения
        function reqCheck(elem){
            if(elem.hasAttribute("data-req")){
                validErrors.push(elem);
            };
        };

        // Убрать указание об ошибке
        function noErrors(elem){
            let elemParent = elem.parentElement;
            while(!elemParent.classList.contains("form__group")){
                elemParent = elemParent.parentElement;
            };
            if(elemParent.classList.contains("js-valid-error")){
                elemParent.classList.remove("js-valid-error");
            };
        };

        // Проверка прилагаемого файла
        function fileCheck(elem, file){
            if(file.size > 5000000){
                validErrors.push(elem);
            }else{
                noErrors(elem);
            };
        };

        // Проверка вводимых данных через регулярное выражение
        function valueCheck(elem, val, patrn){
            if(!patrn.test(val)){
                validErrors.push(elem); 
            }else{
                noErrors(elem);
            };
        };

        // Ищем форму, к которой относится кнопка
        let form = this.parentElement;
        while(form.tagName != "FORM"){
            form = form.parentElement
        };

        // Ищем все элементы данной формы
        let formElems = form.querySelectorAll("input, select, textarea");
        
        // Создаем массив для полей с ошибками
        let validErrors = [];

        // Основной цикл проверки на правильность заполнения формы
        for(let i = 0; i < formElems.length; i++){

            let elemType;
            if(formElems[i].hasAttribute("type")){
                elemType = formElems[i].getAttribute("type");
            }else{
                elemType = formElems[i].getAttribute("data-type");
            }

            switch(elemType){

                // Для инпутов
                case "text":
                    if(formElems[i].value == ""){ 
                        reqCheck(formElems[i]);
                    }else{
                        switch(formElems[i].getAttribute("name")){
                            case "surname":
                            case "name":
                                let namePattern = new RegExp("^[а-яa-z\-\s]+$","i");
                                valueCheck(formElems[i], formElems[i].value, namePattern);
                                break;
                            case "phone":   
                                let phonePattern = new RegExp("^[0-9]{11}$");
                                valueCheck(formElems[i], formElems[i].value, phonePattern);
                                break;
                            case "date":   
                                let datePattern = new RegExp("^.{8,10}$");
                                valueCheck(formElems[i], formElems[i].value, datePattern);
                                break;
                            case "mail":
                                let mailPattern = new RegExp("^[a-z0-9\_\-]+@{1}[a-z]+\.{1}[а-яa-z]{2}$","i");
                                valueCheck(formElems[i], formElems[i].value, mailPattern);
                                break;
                        };
                    };
                    break;

                // Для текстовых полей
                case "textarea":
                    if(formElems[i].value == ""){ 
                        reqCheck(formElems[i]);
                    }else{
                        noErrors(formElems[i]);
                    };
                    break;

                // Для селектов
                case "select":
                    if(formElems[i].value == "choice-1"){
                        reqCheck(formElems[i]);
                    }else{
                        noErrors(formElems[i]);
                    };
                    break;

                // Для чекбоксов
                case "checkbox":
                    if(!formElems[i].checked){
                        reqCheck(formElems[i]);
                    }else{
                        noErrors(formElems[i]);
                    };
                    break;

                // Для файлов
                case "file":
                    if(!formElems[i].files[0]){
                        reqCheck(formElems[i]);
                    }else if(formElems[i].files[0]){
                        fileCheck(formElems[i], formElems[i].files[0]);
                    };
                    break;
            };
        };

        // Проверка, есть ли поля с ошибками заполнения, отмена отправки, и назначение подсказок об ошибках
        if(validErrors.length){
            event.preventDefault();
            for(let i = 0; i < validErrors.length; i++){

                let elemParent = validErrors[i].parentElement;
                while(!elemParent.classList.contains("form__group")){
                    elemParent = elemParent.parentElement;
                };
                if(!elemParent.classList.contains("js-valid-error")){
                    elemParent.classList.add("js-valid-error");
                };
            };
        };
    };

    // Кнопки отправки форм
    const submitButtons = document.querySelectorAll(".js-submit");

    // Если кнопки найдены, по клику на них проверяем относящуюся к ним форму на валидность
    if(submitButtons){
        for(let i = 0; i < submitButtons.length; i++){
            submitButtons[i].addEventListener("click", validationCheck);
        };  
    };

})();


// Табы
(function () {

    // Находим все группы табов на странице и инициализируем
    let tabsContainers = document.querySelectorAll(".js-tabs");
    if(tabsContainers){
        for(let i = 0; i < tabsContainers.length; i++){
            let tabs = new TabsInit(tabsContainers[i]);
        };
    };

    // Инициализирует табы
    function TabsInit(tabContainer){

        // Находим все кнопки табов
        let buttons = tabContainer.querySelectorAll(".tabs__button");

        // Если кнопки найдены, назначаем на них событие
        if(buttons){
            for(let i = 0; i < buttons.length; i++){
                buttons[i].addEventListener("click", changeTabState);
            };
        };

        // Назначаем активный таб
        let activeTab = tabContainer.querySelector(".tabs__button");
        activeTab.classList.add("tabs__button--active");

        // Выводим контент активного таба
        changeTabsContent(activeTab, tabContainer);
    };

    // Меняет активный таб
    function changeTabState(){

        // Находим корневую группу нажатого таба
        let tabContainer = this.parentElement;
        while(!tabContainer.classList.contains("js-tabs")){
            tabContainer = tabContainer.parentElement; 
        };

        // Находим в корневой группе текущий активный таб и переназначаем
        tabContainer.querySelector(".tabs__button--active").classList.remove("tabs__button--active");
        this.classList.add("tabs__button--active");

        // Выводим контент активного таба
        changeTabsContent(this, tabContainer)
    };

    // Выводит контент активного таба
    function changeTabsContent(activeTab, activeTabContainer){

        // Находим контент для новой активной группы табов
        let contentName = activeTabContainer.getAttribute("data-tabs");
        let contentGroupName = activeTab.getAttribute("data-tab");
        let content = document.querySelector("[data-tabs-content=" + contentName + "]");
        let contentGroup = content.querySelector("[data-content-group=" + contentGroupName + "]");

        // Если контент найден
        if(contentGroup){

            // Скрываем прежний активный контент
            if(content.querySelector(".js-content-is-visible")){
                content.querySelector(".js-content-is-visible").classList.remove("js-content-is-visible");
            };

            // Выводим новый активный контент
            contentGroup.classList.add("js-content-is-visible");
        };
    };

})();