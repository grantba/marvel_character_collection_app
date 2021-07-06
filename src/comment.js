class Comment {

    static addCollectionCharacterComment(event) {
        const characterId = event.target.parentElement.parentElement.parentElement.parentElement.dataset.id;
        const name = event.target.parentElement.parentElement.parentElement.querySelector("h2").innerText;
        const userId = localStorage.getItem('currentUser');
        
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
            commentService.addCharacterComment(description, characterId, userId, name);
        });
    }

    static addUserComments(commentsInfo) {
        const userId = localStorage.getItem('currentUser');
        const comments = commentsInfo.data.filter(comment => comment.relationships.user.data.id === userId);

        const div = document.createElement("div");
        div.innerHTML = `
            <h2 id="all-comments-header">Your Character Comments</h2>
            `
        div.id = "all-comments";

        if (comments.length === 0) {
            alert("You have no comments created at this time. If you haven't added any characters to your collection yet, you will have the ability to create comments for each character, once you have added them to your collection.")
        }
        else {
            comments.forEach(comment => {
                if (comment.relationships.user.data.id === userId) {
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
        const userId = localStorage.getItem('currentUser');

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
            commentService.editCharacterComment(editDescription, characterId, userId, commentId, characterName);
        });
    }

    static displayCollectionCharacterComments(allComments, character) {
        const name = character.data.attributes.name;
        const div = document.createElement("div");
        
        const comments = allComments.data.filter(comment => comment.attributes.character.name === name);
        let content = "";

        if (comments.length === 0) {
            div.innerHTML = `<p>This character currently has no comments but you could be the first to add one!</p><br>`;
        }        
        else {
            comments.forEach(comment => {
                debugger;
                const userName = localStorage.getItem('currentUserName');
                div.innerHTML += `<p>"${comment.attributes.description}"</p><br><br>`;
            });
        };

        // -  ${userName.charAt(0).toUpperCase() + userName.slice(1)}

        div.id = "all-character-comments";
        const cardDiv = document.getElementById("comment-card");
        cardDiv.appendChild(div);
    }
}