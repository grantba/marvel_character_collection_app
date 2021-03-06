class CollectionCharacter {

    constructor(id, name, description, thumbnail, urls, comics, events, series, like, userId) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.thumbnail = thumbnail;
        this.urls = urls;
        this.comics = comics;
        this.events = events;
        this.series = series;
        this.like = Like.updateLikeStatus(like);
        this.userId = userId;

        this.element = document.createElement("div");
        this.element.dataset.id = this.id;
        this.displayCollectionCharacter();

        this.addMoreInfoButtonListener();
        this.addHeartListener();
        this.addRemoveFromCollectionButtonListener();
        this.addCommentCollectionButtonListener();
    };

    addHeartListener() {
        const like = this.element.querySelector(".like");
        like.addEventListener("click", () => Like.changeLikeStatus(event));
        const unlike = this.element.querySelector(".unlike");
        unlike.addEventListener("click", () => Like.changeUnlikeStatus(event));
    };
    
    addRemoveFromCollectionButtonListener() {
        const collButton = this.element.querySelector(".remove-collection-btn");
        collButton.addEventListener("click", () => characterService.removeCollectionCharacter(event));
    };

    addCommentCollectionButtonListener() {
        const commentButton = this.element.querySelector(".comment-collection-btn");
        commentButton.addEventListener("click", () => Comment.addCollectionCharacterComment(event));
    };

    addMoreInfoButtonListener() {
        const infoButton = this.element.querySelector(".more-info-coll-btn");
        infoButton.addEventListener("click", () => getMoreInfo(event, this.id));
    };

    displayCollectionCharacter() {
        characterDiv.appendChild(this.createDiv());
    };

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
                    <a href=${this.urls} id="marvel-link" target="_blank">Marvel Link</a>
                    <p>${this.description}</p>
                    <button class="remove-collection-btn">Remove From My Collection</button>
                    <button class="comment-collection-btn">Add Comment</button>
                    <button class="more-info-coll-btn">See More Information</button>
                    <p id="likes-text">${this.like}</p>
                </div>
            </div>
        </div>
        <br><br>
        `;
        return this.element;
    };

    static createCollectionCharacter(characterInfo) {
        if (characterInfo['status'] === "Ok") {
            if (characterInfo['data']['results'].length === 0) {
                alert("There was an issue adding this character to your collection. Please try again.");
            } else {
                let name = characterInfo['data']["results"][0]['name'];
                let description = characterInfo['data']["results"][0]['description'];
                let thumbnail = characterInfo['data']["results"][0]['thumbnail']['path'] + "/portrait_fantastic." + characterInfo['data']["results"][0]['thumbnail']['extension'];
                let urls = characterInfo['data']['results'][0]['urls'][0]['url'];
                let comicsList = characterInfo['data']["results"][0]['comics']['items'];
                let comics = comicsList.map(comic => {
                    return `=>${comic.name}`;
                }); 
                let eventsList = characterInfo['data']["results"][0]['events']['items'];
                let events = eventsList.map(event => {
                    return `=>${event.name}`;
                }); 
                let seriesList = characterInfo['data']["results"][0]['series']['items'];
                let series = seriesList.map(series => {
                    return `=>${series.name}`;
                });
            characterService.addCharacterToCollection(name, description, thumbnail, urls, comics, events, series);
            };
        } else {
            alert("There was an issue adding this character to your collection. Please try again.");
        };
    };

    static addSingleCollectionCharacter(character) {
        characterDiv.innerHTML = "";
        commentsDiv.innerHTML = "";

        let id = character.data.id;
        let {name, description, thumbnail, urls} = character.data.attributes;
        let comics = null;
        let events = null;
        let series = null;
        let like = null;
        let userId = localStorage.getItem('currentUser');
        
        new CollectionCharacter(id, name, description, thumbnail, urls, comics, events, series, like, userId);
    };

    static addCollectionCharacters(charactersInfo) {
        characterDiv.innerHTML = "";
        commentsDiv.innerHTML = "";

        const userId = localStorage.getItem('currentUser');
        const characters = charactersInfo.filter(character => character.relationships.user.data.id === userId);

        if (characters.length > 0) {
            characters.forEach(character => {
                let id = character.id;
                let {name, description, thumbnail, urls} = character.attributes;
                let comics = null;
                let events = null;
                let series = null;
                let likes = character.attributes.likes.find(like => like.user_id === parseInt(userId));
                let like = (likes === undefined ? undefined : likes.like_status);

                new CollectionCharacter(id, name, description, thumbnail, urls, comics, events, series, like, userId);
            });
        };
        if (characters.length === 0) {
            alert("You have no characters in your collection at this time!");
        };
    };

    static displayExtraInfoCollectionCharacter(character) {
        characterDiv.innerHTML = "";
        commentsDiv.innerHTML = "";

        let userId = localStorage.getItem('currentUser');
        let id = character.data.id;
        let {name, description, thumbnail, urls, comics, events, series} = character.data.attributes;
        let likes = character.data.attributes.likes.find(like => like.user_id === userId);
        let like = (likes === undefined ? undefined : likes.like_status);

        new CollectionCharacter(id, name, description, thumbnail, urls, comics, events, series, like, userId).displayExtraInfoDivs();
    };

    displayExtraInfoDivs() {
        const comicsList = (this.comics.length === 0 ? "<li>Unfortunately, this character has had no comic appearances yet. Contact Marvel and tell them how you feel about this!<br><br>" : this.comics.replaceAll(",=>", "<br><br><li> ").replaceAll("=>", "<li> "));
        const eventsList = (this.events.length === 0 ? "<li>Unfortunately, this character has had no event appearances yet. Contact Marvel and tell them how you feel about this!<br><br>" : this.events.replaceAll(",=>", "<br><br><li> ").replaceAll("=>", "<li> "));
        const seriesList = (this.series.length === 0 ? "<li>Unfortunately, this character has had no series appearances yet. Contact Marvel and tell them how you feel about this!<br><br>" : this.series.replaceAll(",=>", "<br><br><li> ").replaceAll("=>", "<li> "));

        const div2 = document.createElement("div");
        div2.innerHTML = `
        <div class="info-card">
            <div class="info-card-inner">
                <h2>${this.name} Comic Appearances</h2>
                <ul>
                <p>${comicsList}</p>
                </ul>
            </div>
        </div>
        <br><br>
        `;
        div2.dataset.id = this.id;
    
        const div3 = document.createElement("div");
        div3.innerHTML = `
        <div class="info-card">
            <div class="info-card-inner">
                <h2>${this.name} Event Appearances</h2>
                <ul>
                <p>${eventsList}</p>
                </ul>
            </div>
        </div>
        <br><br>
        `;
        div3.dataset.id = this.id;
    
        const div4 = document.createElement("div");
        div4.innerHTML = `
        <div class="info-card">
            <div class="info-card-inner">
                <h2>${this.name} Series Appearances</h2>
                <ul>
                <p>${seriesList}</p>
                </ul>
            </div>
        </div>
        <br><br>
        `;
        div4.dataset.id = this.id;

        characterDiv.appendChild(div2);
        characterDiv.appendChild(div3);
        characterDiv.appendChild(div4);
    };

    static addExtraInfoCollectionCharacter(character) {
        CollectionCharacter.displayExtraInfoCollectionCharacter(character);
    
        document.querySelector(".more-info-coll-btn").remove();
        document.querySelector("#likes-text").remove();

        likeService.getAllLikes(character);
    };

};
