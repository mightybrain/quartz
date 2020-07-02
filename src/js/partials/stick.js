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