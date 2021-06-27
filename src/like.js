class Like {

    static changeLikeStatus(event) {
        if (event.target.innerText === "Like ❤") {
            event.target.innerText = "❤️";
            event.target.nextElementSibling.innerText = "";
            alert("You have liked this character!😊")
        }
        else {
            event.target.innerText = "Like ❤";
            event.target.nextElementSibling.innerText = "Dislike ❤";
            alert("You no longer like this character.🙁")
        }
    }
    
    static changeUnlikeStatus(event) {
        if (event.target.innerText === "Dislike ❤") {
            event.target.innerText = "🖤";
            event.target.previousElementSibling.innerText = "";
            alert("You do not like this character💔...but they may not like you either.😉")
        }
        else {
            event.target.innerText = "Dislike ❤";
            event.target.previousElementSibling.innerText = "Like ❤";
            alert("Your feelings for this character have changed...maybe for the better❓❓❓")
        }
    }
}