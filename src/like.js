class Like {

    static changeLikeStatus(event) {
        const characterId = parseInt(event.target.parentElement.parentElement.parentElement.parentElement.parentElement.dataset.id);
        const name = event.target.parentElement.parentElement.parentElement.querySelector(".collection-character").innerText;
        const userId = localStorage.getItem('currentUser');

        if (event.target.innerText.includes("Like")) {
            event.target.innerText = "❤️";
            event.target.nextElementSibling.innerText = "";
            alert("You have liked this character!😊");
            let likeStatus = "true";
            likeService.updateCharacterLikeStatus(likeStatus, userId, characterId, name);
        } else {
            event.target.innerText = "Like ❤ ";
            event.target.nextElementSibling.innerText = "Dislike ❤";
            alert("You no longer like this character.🙁");
            let likeStatus = null;
            likeService.updateCharacterLikeStatus(likeStatus, userId, characterId, name);
        };
    };
    
    static changeUnlikeStatus(event) {
        const characterId = parseInt(event.target.parentElement.parentElement.parentElement.parentElement.parentElement.dataset.id);
        const name = event.target.parentElement.parentElement.parentElement.querySelector(".collection-character").innerText;
        const userId = localStorage.getItem('currentUser');

        if (event.target.innerText === "Dislike ❤") {
            event.target.innerText = "🖤";
            event.target.previousElementSibling.innerText = "";
            alert("You do not like this character💔...but they may not like you either.😉");
            let likeStatus = "false";
            likeService.updateCharacterLikeStatus(likeStatus, userId, characterId, name);
        } else {
            event.target.innerText = "Dislike ❤";
            event.target.previousElementSibling.innerText = "Like ❤";
            alert("Your feelings for this character have changed...maybe for the better❓❓❓");
            let likeStatus = null;
            likeService.updateCharacterLikeStatus(likeStatus, userId, characterId, name);
        };
    };

    static updateLikeStatus(like) {
        if (like === true) {
            return `<span class="like">❤️</span><span class="unlike"></span>`;
        };
        if (like === false) {
            return `<span class="like"></span><span class="unlike">🖤</span>`;
        };
        if (like === null || like === undefined) {
            return `<span class="like">Like ❤</span>&emsp;<span class="unlike">Dislike ❤</span>`;
        };
    };

    static displayCollectionCharacterLikes(allLikes, character) {
        const name = character.data.attributes.name;
        const div = document.createElement("div");

        const likes = allLikes.data.filter(like => like.attributes.character.name === name);

        let totalLikes = 0;
        let totalDislikes = 0;

        likes.forEach(like => {
            if (like.attributes.like_status === true) {
                totalLikes += 1;
            };
            if (like.attributes.like_status === false) {
                totalDislikes += 1;
            };
        });
    
        const like = (`${totalLikes} like${totalLikes !== 1 ? 's' : ''}`);
        const dislike = (`${totalDislikes} dislike${totalDislikes !== 1 ? 's' : ''}`);

        const cardContent = `
        <div id="comment-card">
            <div id="comment-card-inner">
                <h2>${name} Comments</h2>
                <h3 class="left-align">❤️ ${name} has a total of ${like}. ❤️</h3>
                <h3 class="right-align">🖤 ${name} has a total of ${dislike}. 🖤</h3>
            </div>
        </div>
        `;
    
        div.innerHTML = cardContent;
        commentsDiv.appendChild(div);
        commentService.getAllComments(character);
    };

};