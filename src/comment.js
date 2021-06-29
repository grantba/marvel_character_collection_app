class Comment {

    static addCollectionCharacterComment(event) {
        const characterId = event.target.parentElement.parentElement.parentElement.parentElement.dataset.id;
        const name = event.target.parentElement.parentElement.parentElement.querySelector("h2").innerText;
        
        const form = document.createElement("form");
        form.innerHTML = `
            <label id="comment-label">Create a comment for ${name}:</label><br><br>
            <input id="character-id" type="hidden" value=${characterId}>
            <textarea id="character-description" placeholder="Enter Comment Description Here..."></textarea><br><br>
            <input type="submit" id="comment-form-btn" value="Submit Comment">
        `
        form.id = "form";
        characterDiv.innerHTML = "";
        commentsDiv.innerHTML = "";
        commentsDiv.appendChild(form);
        
        const characterCommentForm = document.getElementById("form");
        characterCommentForm.addEventListener("submit", event => {
            event.preventDefault();
            const description = document.getElementById("character-description").value;
            // const characterId = parseInt(document.getElementById("character-id").value);
            const user_id = 1;
            commentService.updateCharacterComments(description, characterId, user_id, name);
        });
    }

    static addUserComments(comments) {
        const user_id = 1;
        let username = comments.data[0].attributes.user.username;

        const ul = document.createElement("ul");
        const div = document.createElement("div");
        div.innerHTML = `
            <h2 id="user-comment-card-inner">${username} Comments</h2>
            `
        div.id = "user-comment-card";

        if (comments.data.length === 0) {
            alert("You have no comments created at this time. If you haven't added any characters to your collection yet, you will have the ability to create comments for each character, once you have added them to your collection.")
        }
        else {
            comments.data.forEach(comment => {
                if (comment.attributes.user.id === user_id) {
                    let commentDescription = comment.attributes.description;
                    let characterName = comment.attributes.character.name;
                    let characterThumbnail = comment.attributes.character.thumbnail;
                    let smallCharacterThumbnail = comments.data[0].attributes.character.thumbnail.replace("portrait_fantastic", "portrait_small");
                    
                    const cardContent = `
                        <img src=${smallCharacterThumbnail} alt="${characterName} Marvel Character Image">
                        <h3 class="user-comments">${characterName} - ${commentDescription}</h3>
                    `
                    div.innerHTML += cardContent;
                }
                characterDiv.innerHTML = "";
                commentsDiv.innerHTML = "";
                commentsDiv.appendChild(div); 
            })
        }
    }
}