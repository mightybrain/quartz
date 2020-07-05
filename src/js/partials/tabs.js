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