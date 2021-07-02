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
            const userId = 1;
            commentService.addCharacterComment(description, characterId, userId, name);
        });
    }

    static addUserComments(comments) {
        const userId = 1;
        // let username = comments.data[0].attributes.user.username;

        // const ul = document.createElement("ul");
        const div = document.createElement("div");
        div.innerHTML = `
            <h2 id="user-comment-card-inner">Your Character Comments</h2>
            `
        div.id = "user-comment-card";

        if (comments.data.length === 0) {
            alert("You have no comments created at this time. If you haven't added any characters to your collection yet, you will have the ability to create comments for each character, once you have added them to your collection.")
        }
        else {
            comments.data.forEach(comment => {
                if (comment.attributes.user.id === userId) {
                    let commentId = comment.id;
                    let commentDescription = comment.attributes.description;
                    let characterName = comment.attributes.character.name;
                    let characterId = comment.attributes.character.id;
                    let characterThumbnail = comment.attributes.character.thumbnail;
                    let smallCharacterThumbnail = characterThumbnail.replace("portrait_fantastic", "portrait_small");
                    
                    const cardContent = `
                        <img src=${smallCharacterThumbnail} id="${characterId}-characterId" alt="${characterName} Marvel Character Image">&emsp;
                        <a href="#" id="comment-link" class="edit-comment">Edit Comment</a>&emsp;
                        <a href="#" id="comment-link" class="delete-comment">Delete Comment</a>
                        <h3 class="user-comments" id="${commentId}-commentId">${characterName} - ${commentDescription}</h3><br>
                    `
                    div.innerHTML += cardContent;
                }
                characterDiv.innerHTML = "";
                commentsDiv.innerHTML = "";
                commentsDiv.appendChild(div); 
            })
            Comment.addEditCommentButtonListener();
            Comment.addDeleteCommentButtonListener();
        }
    }

    static addEditCommentButtonListener() {
        const editButtons = document.getElementsByClassName("edit-comment");
        for (const button of editButtons) {
            button.addEventListener("click", event => Comment.editCharacterCommentForm(event));
        }
    }

    static addDeleteCommentButtonListener() {
        const delButtons = document.getElementsByClassName("delete-comment");
        for (const button of delButtons) {
            button.addEventListener("click", event => commentService.deleteCharacterComment(event));
        }
    }

    static editCharacterCommentForm(event) {
        const commentId = parseInt(event.target.nextElementSibling.nextElementSibling.id.split("-").shift());
        const nameWithDescription = event.target.nextElementSibling.nextElementSibling.innerText;
        const characterId = parseInt(event.target.previousElementSibling.id.split("-").shift());
        const characterName = nameWithDescription.split(" - ").shift();
        const description = nameWithDescription.split(" - ").pop();

        const form = document.createElement("form");
        form.innerHTML = `
            <label id="comment-label">Edit your comment for ${characterName}:</label><br><br>
            <input id="comment-id" type="hidden" value=${commentId}>
            <textarea id="character-description">${description}</textarea><br><br>
            <input type="submit" id="comment-form-btn" value="Edit Comment">
        `
        form.id = "form";
        characterDiv.innerHTML = "";
        commentsDiv.innerHTML = "";
        commentsDiv.appendChild(form);
        
        const characterCommentForm = document.getElementById("form");
        characterCommentForm.addEventListener("submit", event => {
            event.preventDefault();
            const editDescription = document.getElementById("character-description").value;
            const userId = 1;
            commentService.editCharacterComment(editDescription, characterId, userId, commentId, characterName);
        });
    }

    static displayCollectionCharacterComments(character) {
        const comments = character.data.attributes.comments;
        const ul = document.createElement("ul");
    
        if (comments.length === 0) {
            const li = document.createElement("li");
            li.innerText = "This character currently has no comments but you could be the first to add one!\n\n"
            ul.appendChild(li);
        }
        else {
            comments.forEach(comment => {
                const li = document.createElement("li");
                li.innerText = `${comment.description}\n\n`;
                ul.appendChild(li);
            })
        }

        const div = document.createElement("div");
        const likes = character.data.attributes.likes;

        let totalLikes = 0;
        let totalDislikes = 0;

        likes.forEach(like => {
            if (like.like_status === true) {
                totalLikes += 1;
            }
            if (like.like_status === false) {
                totalDislikes += 1;
            }
        })
    
        const like = (`${totalLikes} like${totalLikes !== 1 ? 's' : ''}`);
        const dislike = (`${totalDislikes} dislike${totalDislikes !== 1 ? 's' : ''}`);
        const name = character.data.attributes.name;

        const cardContent = `
        <div id="comment-card">
            <div id="comment-card-inner">
                <h2>${name} Comments</h2>
                <h3 class="left-align">❤️ ${name} has a total of ${like}. ❤️</h3>
                <h3 class="right-align">🖤 ${name} has a total of ${dislike}. 🖤</h3>
                <br><br><br>${ul.innerHTML}
            </div>
        </div>
        `
    
        div.innerHTML = cardContent;
        commentsDiv.appendChild(div);
    }
}