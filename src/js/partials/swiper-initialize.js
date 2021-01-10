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
