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
                                let namePattern = new RegExp("^[a-zа-яё -]{1,}$","i");
                                valueCheck(formElems[i], formElems[i].value, namePattern);
                                break;
                            case "phone":   
                                let phonePattern = new RegExp("^[0-9 ]{7,}$");
                                valueCheck(formElems[i], formElems[i].value, phonePattern);
                                break;
                            case "date":   
                                let datePattern = new RegExp("^[0-9]{1,4}[.]{1}[0-9]{1,4}[.]{1}[0-9]{1,4}$");
                                valueCheck(formElems[i], formElems[i].value, datePattern);
                                break;
                            case "mail":
                                let mailPattern = new RegExp("^[a-z0-9_-]{1,}@{1}[a-z]{1,}[.]{1}[a-z]{2}$","i");
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