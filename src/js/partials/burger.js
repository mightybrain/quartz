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