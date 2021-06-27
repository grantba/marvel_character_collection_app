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

        this.displayMarvelCharacter();
    }

    createDiv() {
        this.element = document.createElement("div");
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
        this.element.dataset.id = this.id;
        return this.element;
    }

    displayMarvelCharacter() {
        characterDiv.appendChild(this.createDiv());
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
            addCollectionButtonListener();
            addMoreInfoButtonListener();
            }
        }
        else {
            alert("That character was not found. Please try again.")
        }
    }

}