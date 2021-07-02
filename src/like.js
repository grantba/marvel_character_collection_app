class Like {

    static changeLikeStatus(event) {
        const characterId = parseInt(event.target.parentElement.parentElement.parentElement.parentElement.parentElement.dataset.id);
        const name = event.target.parentElement.parentElement.parentElement.querySelector(".collection-character").innerText;
        // need to update later
        const userId = 1;

        if (event.target.innerText.includes("Like")) {
            event.target.innerText = "❤️";
            event.target.nextElementSibling.innerText = "";
            alert("You have liked this character!😊")
            let likeStatus = "true";
            likeService.updateCharacterLikeStatus(likeStatus, userId, characterId, name);
        }
        else {
            event.target.innerText = "Like ❤ ";
            event.target.nextElementSibling.innerText = "Dislike ❤";
            alert("You no longer like this character.🙁")
            let likeStatus = null;
            likeService.updateCharacterLikeStatus(likeStatus, userId, characterId, name);
        }
    }
    
    static changeUnlikeStatus(event) {
        const characterId = parseInt(event.target.parentElement.parentElement.parentElement.parentElement.parentElement.dataset.id);
        const name = event.target.parentElement.parentElement.parentElement.querySelector(".collection-character").innerText;
        // need to update later
        const userId = 1;

        if (event.target.innerText === "Dislike ❤") {
            event.target.innerText = "🖤";
            event.target.previousElementSibling.innerText = "";
            alert("You do not like this character💔...but they may not like you either.😉")
            let likeStatus = "false";
            likeService.updateCharacterLikeStatus(likeStatus, userId, characterId, name);
        }
        else {
            event.target.innerText = "Dislike ❤";
            event.target.previousElementSibling.innerText = "Like ❤";
            alert("Your feelings for this character have changed...maybe for the better❓❓❓")
            let likeStatus = null;
            likeService.updateCharacterLikeStatus(likeStatus, userId, characterId, name);
        }
    }

    static updateLikeStatus(like) {
        if (like === true) {
            return `<span class="like">❤️</span><span class="unlike"></span>`;
        }
        if (like === false) {
            return `<span class="like"></span><span class="unlike">🖤</span>`;
        }
        if (like === null || like === undefined) {
            return `<span class="like">Like ❤</span>&emsp;<span class="unlike">Dislike ❤</span>`;
        }
    }
}