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


