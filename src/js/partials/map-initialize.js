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

        //locationMap.behaviors.disable("scrollZoom");
        locationMap.controls.remove("searchControl");
        locationMap.controls.remove("rulerControl");
        locationMap.controls.remove("typeSelector");
        locationMap.controls.remove("trafficControl");
        locationMap.controls.remove("geolocationControl");
        locationMap.controls.remove("fullscreenControl");
        locationMap.controls.remove("routeButtonControl");
    };    
};