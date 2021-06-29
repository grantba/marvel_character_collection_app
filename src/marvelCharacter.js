class MarvelCharacter {

    constructor(id, name, description, thumbnail, urls, comics, events, series, user_id) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.thumbnail = thumbnail;
        this.urls = urls;
        this.comics = comics;
        this.events = events;
        this.series = series;

        this.element = document.createElement("div");
        this.element.dataset.id = this.id;
        this.displayMarvelCharacter();
    }

    createDiv() {
        this.element.innerHTML = `
        <div class="flip-card">
            <div class="flip-card-inner">
                <div class="flip-card-front">
                    <br><img src="${this.thumbnail}" alt="${this.name} comic picture">
                    <h2 class="marvel-collection">${this.name}</h2>
                </div>
                <div class="flip-card-back">
                    <h2>${this.name}</h2>
                    <a href=${this.urls} target="_blank" style="text-decoration: none">Marvel Link</a>
                    <p>${this.description}</p>
                    <button class="collection-btn">Add to My Collection</button>
                    <button class="more-info-btn">See More Information</button>
                </div>
            </div>
        </div>
        <br><br>
        `
        return this.element;
    }

    displayMarvelCharacter() {
        characterDiv.appendChild(this.createDiv());
        MarvelCharacter.addCollectionButtonListener();
        MarvelCharacter.addMoreInfoButtonListener();
    }
    
    static displaySearchForm() {
        const form = document.createElement("form");
        form.innerHTML = `
            <label id="search-label">Search for Character By Name:</label><br><br>
            <input type="text" id="character-name" placeholder="Enter Name Here..."><br><br>
            <input type="submit" id="search-btn" value="Search">
        `
        form.id = "marvel-character-search-form";
        characterDiv.innerHTML = "";
        commentsDiv.innerHTML = "";
        commentsDiv.appendChild(form);
        
        const characterSearchForm = document.getElementById("marvel-character-search-form");
        characterSearchForm.addEventListener("submit", event => {
            event.preventDefault();
            const search = document.getElementById("character-name").value;
            characterService.getMarvelCharacterByName(search);
        });
    }

    static createMarvelCharacter(characterInfo) {
        if (characterInfo['status'] === "Ok") {
            if (characterInfo['data']['results'].length === 0) {
                alert("That character was not found. Please try again.")
            }
            if (characterInfo['data']['results'].length >= 1) {
                characterDiv.innerHTML = "";
                commentsDiv.innerHTML = "";
                characterInfo['data']['results'].forEach(character => {
                    let id = character.id;
                    let name = character.name;
                    let description = character.description;
                    let thumbnail = character.thumbnail.path + "/portrait_fantastic." + character.thumbnail.extension;
                    let urls = characterInfo['data']['results'][0]['urls'][0]['url'];

                    new MarvelCharacter(id, name, description, thumbnail, urls);
                })
            }
        }
        else {
            alert("That character was not found. Please try again.")
        }
    }

    static addCollectionButtonListener() {
        const collButtons = document.getElementsByClassName("collection-btn");
        for (const button of collButtons) {
            button.addEventListener("click", event => characterService.getMarvelCharacterById(event));
        }
    }

    static addMoreInfoButtonListener() {
        const infoButtons = document.getElementsByClassName("more-info-btn");
        for (const button of infoButtons) {
            button.addEventListener("click", event => getMoreInfo(event));
        }
    }

    static addExtraInfoMarvelCharacter(characterInfo) {
        characterDiv.innerHTML = "";
        commentsDiv.innerHTML = "";

        let id = characterInfo['data']["results"][0]['id'];
        let name = characterInfo['data']["results"][0]['name'];
        let description = characterInfo['data']["results"][0]['description'];
        let thumbnail = characterInfo['data']["results"][0]['thumbnail']['path'] + "/portrait_fantastic." + characterInfo['data']["results"][0]['thumbnail']['extension'];
        let urls = characterInfo['data']['results'][0]['urls'][0]['url'];
        let comicsList = characterInfo['data']["results"][0]['comics']['items'];
        let comicsArray = comicsList.map(comic => {
            return `=>${comic.name}`;
        }) 
        let comicsString = comicsArray.toString();
        let comics = comicsString.replaceAll(",=>", "<br><br><li> ").replaceAll("=>", "<li> ");
        let eventsList = characterInfo['data']["results"][0]['events']['items'];
        let eventsArray = eventsList.map(event => {
            return `=>${event.name}`;
        }) 
        let eventsString = eventsArray.toString();
        let events = eventsString.replaceAll(",=>", "<br><br><li> ").replaceAll("=>", "<li> ");
        let seriesList = characterInfo['data']["results"][0]['series']['items'];
        let seriesArray = seriesList.map(series => {
            return `=>${series.name}`;
        }) 
        let seriesString = seriesArray.toString();
        let series = seriesString.replaceAll(",=>", "<br><br><li> ").replaceAll("=>", "<li> ");

        new MarvelCharacter(id, name, description, thumbnail, urls, comics, events, series).displayExtraInfoMarvelCharacter();
    }

    displayExtraInfoMarvelCharacter() {  
        const div2 = document.createElement("div");
        div2.innerHTML = `
        <div class="info-card">
            <div class="info-card-inner">
                <h2>${this.name} Comic Appearances</h2>
                <ul>
                <p>${this.comics}</p>
                </ul>
            </div>
        </div>
        <br><br>
        `
        div2.dataset.id = this.id;
    
        const div3 = document.createElement("div");
        div3.innerHTML = `
        <div class="info-card">
            <div class="info-card-inner">
                <h2>${this.name} Event Appearances</h2>
                <ul>
                <p>${this.events}</p>
                </ul>
            </div>
        </div>
        <br><br>
        `
        div3.dataset.id = this.id;
    
        const div4 = document.createElement("div");
        div4.innerHTML = `
        <div class="info-card">
            <div class="info-card-inner">
                <h2>${this.name} Series Appearances</h2>
                <ul>
                <p>${this.series}</p>
                </ul>
            </div>
        </div>
        <br><br>
        `
        div4.dataset.id = this.id;
    
        document.querySelector(".more-info-btn").remove();
        characterDiv.appendChild(div2);
        characterDiv.appendChild(div3);
        characterDiv.appendChild(div4);
    }

}