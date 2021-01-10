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
