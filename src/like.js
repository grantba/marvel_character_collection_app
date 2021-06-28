class Like {

    static changeLikeStatus(event) {
        const character_id = parseInt(event.target.parentElement.parentElement.parentElement.parentElement.parentElement.dataset.id);
        const name = event.target.parentElement.parentElement.parentElement.querySelector(".collection-character").innerText;
        // need to update later
        const user_id = 1;

        if (event.target.innerText === "Like ❤") {
            event.target.innerText = "❤️";
            event.target.nextElementSibling.innerText = "";
            let like_status = "true";
            likeService.updateCharacterLikeStatus(like_status, user_id, character_id, name);
            alert("You have liked this character!😊")
        }
        else {
            event.target.innerText = "Like ❤";
            event.target.nextElementSibling.innerText = "Dislike ❤";
            let like_status = null;
            likeService.updateCharacterLikeStatus(like_status, user_id, character_id, name);
            alert("You no longer like this character.🙁")
        }
    }
    
    static changeUnlikeStatus(event) {
        const character_id = parseInt(event.target.parentElement.parentElement.parentElement.parentElement.parentElement.dataset.id);
        const name = event.target.parentElement.parentElement.parentElement.querySelector(".collection-character").innerText;
        // need to update later
        const user_id = 1;

        if (event.target.innerText === "Dislike ❤") {
            event.target.innerText = "🖤";
            event.target.previousElementSibling.innerText = "";
            let like_status = "false";
            likeService.updateCharacterLikeStatus(like_status, user_id, character_id, name);
            alert("You do not like this character💔...but they may not like you either.😉")
        }
        else {
            event.target.innerText = "Dislike ❤";
            event.target.previousElementSibling.innerText = "Like ❤";
            let like_status = null;
            likeService.updateCharacterLikeStatus(like_status, user_id, character_id, name);
            alert("Your feelings for this character have changed...maybe for the better❓❓❓")
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