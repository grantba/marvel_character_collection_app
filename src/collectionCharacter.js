class CollectionCharacter {

    constructor(id, name, description, thumbnail, urls, comics, events, series, like, user_id) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.thumbnail = thumbnail;
        this.urls = urls;
        this.comics = comics;
        this.events = events;
        this.series = series;
        this.like = Like.updateLikeStatus(like);
        this.user_id = user_id;

        this.element = document.createElement("div");
        this.element.dataset.id = this.id;
        this.displayCollectionCharacter();
    }

    createDiv() {
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
                    <p id="likes-text">${this.like}</p>
                </div>
            </div>
        </div>
        <br><br>
        `
        return this.element;
    }

    displayCollectionCharacter() {
        characterDiv.appendChild(this.createDiv());
        CollectionCharacter.addRemoveFromCollectionButtonListener();
        CollectionCharacter.addCommentCollectionButtonListener();
        addMoreInfoButtonListener();
        CollectionCharacter.addHeartListener();
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
        let comics = null;
        let events = null;
        let series = null;
        let like = null;
        let user_id = 1;
        
        new CollectionCharacter(id, name, description, thumbnail, urls, comics, events, series, like, user_id);
    }

    static addHeartListener() {
        const likes = document.getElementsByClassName("like");
        for (const like of likes) {
            like.addEventListener("click", event => Like.changeLikeStatus(event))};
        const unlikes = document.getElementsByClassName("unlike");
        for (const unlike of unlikes) {
            unlike.addEventListener("click", event => Like.changeUnlikeStatus(event))};
    }
    
    static addRemoveFromCollectionButtonListener() {
        const collButtons = document.getElementsByClassName("remove-collection-btn");
        for (const button of collButtons) {
            button.addEventListener("click", event => characterService.removeCollectionCharacter(event));
        }
    }

    static addCommentCollectionButtonListener() {
        const commentButtons = document.getElementsByClassName("comment-collection-btn");
        for (const button of commentButtons) {
            button.addEventListener("click", event => Comment.addCollectionCharacterComment(event));
        }
    }
    
    static removeCharacterDiv(div, character) {
        div.remove();
        alert(`${character.data.attributes.name} was removed from your character collection!`)
    }

    static addUpdatedLikeCollectionCharacter(character, like_status) {
        characterDiv.innerHTML = "";
        commentsDiv.innerHTML = "";

        let id = character.id;
        let name = character.name;
        let description = character.description;
        let thumbnail = character.thumbnail;
        let urls = character.urls;
        let comics = null;
        let events = null;
        let series = null;
        let like = (like_status === undefined ? undefined : like_status);
        let user_id = 1;
        
        new CollectionCharacter(id, name, description, thumbnail, urls, comics, events, series, like, user_id);
    }

    // user can only leave one comment per character
    static addCollectionCharacters(characters) {
        characterDiv.innerHTML = "";
        commentsDiv.innerHTML = "";

        if (characters.length === 0) {
            alert("You have no characters in your collection at this time!")
        }
        else {
            characters.forEach(character => {
                let id = character.id;
                let name = character.attributes.name;
                let description = character.attributes.description;
                let thumbnail = character.attributes.thumbnail;
                let urls = character.attributes.urls;
                let likes = character.attributes.likes.find(like => like.user_id === 1);
                let like = (likes === undefined ? undefined : likes.like_status);
                let comics = null;
                let events = null;
                let series = null;
                let user_id = 1;

                new CollectionCharacter(id, name, description, thumbnail, urls, comics, events, series, like, user_id);
            })
        }
    }

}
