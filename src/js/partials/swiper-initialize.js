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