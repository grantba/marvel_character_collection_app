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
}