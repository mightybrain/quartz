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