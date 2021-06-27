class CollectionCharacter {

    constructor(id, name, description, thumbnail, urls, comics, events, series, user_id) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.thumbnail = thumbnail;
        this.urls = urls;
        this.comics = comics;
        this.events = events;
        this.series = series;
        this.user_id = user_id;

        this.displayCollectionCharacter();
    }

    createDiv() {
        this.element = document.createElement("div");
        this.element.innerHTML = `
        <div class="flip-card">
            <div class="flip-card-inner">
                <div class="flip-card-front">
                    <br><img src="${this.thumbnail}" alt="${this.name} comic picture">
                    <h2 class="collection-character">${this.name}</h2>
                </div>
                <div class="flip-card-back">
                    <h2>${this.name}</h2>
                    <a href=${this.urls} target="_blank" style="text-decoration: none">Marvel Link</a>
                    <p>${this.description}</p>
                    <button class="remove-collection-btn">Remove From My Collection</button>
                    <button class="comment-collection-btn">Add Comment</button>
                    <button class="more-info-btn">See More Information</button>
                    <p id="likes-text"><span class="like">Like ❤</span>&emsp;<span class="unlike">Dislike ❤</span></p>
                </div>
            </div>
        </div>
        <br><br>
        `
        this.element.dataset.id = this.id;
        return this.element;
    }

    displayCollectionCharacter() {
        characterDiv.appendChild(this.createDiv());
        // addRemoveFromCollectionButtonListener();
        // addCommentCollectionButtonListener();
        // addMoreInfoButtonListener();
        // addHeartListener();
    }

    static createCollectionCharacter(characterInfo) {
        if (characterInfo['status'] === "Ok") {
            if (characterInfo['data']['results'].length === 0) {
                alert("There was an issue adding this character to your collection. Please try again.")
            }
            else {
                let name = characterInfo['data']["results"][0]['name'];
                let description = characterInfo['data']["results"][0]['description'];
                let thumbnail = characterInfo['data']["results"][0]['thumbnail']['path'] + "/portrait_fantastic." + characterInfo['data']["results"][0]['thumbnail']['extension'];
                let urls = characterInfo['data']['results'][0]['urls'][0]['url'];
                let comicsList = characterInfo['data']["results"][0]['comics']['items'];
                let comics = comicsList.map(comic => {
                    return `=>${comic.name}`;
                }) 
                let eventsList = characterInfo['data']["results"][0]['events']['items'];
                let events = eventsList.map(event => {
                    return `=>${event.name}`;
                }) 
                let seriesList = characterInfo['data']["results"][0]['series']['items'];
                let series = seriesList.map(series => {
                    return `=>${series.name}`;
                }) 
            characterService.addCharacterToCollection(name, description, thumbnail, urls, comics, events, series);
            }
        }
        else {
            alert("There was an issue adding this character to your collection. Please try again.")
        }
    }

    static addCollectionCharacter(character) {
        alert(`${character.data.attributes.name} was added to your character collection!`)
        characterDiv.innerHTML = "";
        commentsDiv.innerHTML = "";
        let id = character.data.id;
        let name = character.data.attributes.name;
        let description = character.data.attributes.description;
        let thumbnail = character.data.attributes.thumbnail;
        let urls = character.data.attributes.urls;

        new CollectionCharacter(id, name, description, thumbnail, urls);
    }
}