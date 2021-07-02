class CommentService {

    constructor(url) {
        this.url = url
    }

    getUserComments() {
        fetch(`${this.url}/comments`)
        .then(resp => resp.json())
        .then(comments => {Comment.addUserComments(comments)})
        .catch((error) => {
            alert(`There was an issue getting the comments for your collection characters due to ${error}. Please try again.`)
        });
    }

    addCharacterComment(description, characterId, user_id, name) {
        const params = {
            "description": description,
            "user_id": user_id,
            // added user id for now, will change later
            "character_id": characterId
        }
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params)
        }
        fetch(`${this.url}/comments`, options)
        .then(resp => resp.json())
        .then(() => {
            alert(`Your comment for ${name} was successfully created.`)
            characterService.getInfoCollectionCharacter(characterId)})
        .catch(error => {
            alert(`There was an issue adding this description to your character, ${name}, due to ${error}. Please try again.`)
        });
    }

    editCharacterComment(editDescription, characterId, user_id, commentId, characterName) {
        const params = {
            "description": editDescription,
            "user_id": user_id,
            // added user id for now, will change later
            "character_id": characterId
        }
        const options = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params)
        }
        fetch(`${this.url}/comments/${commentId}`, options)
        .then(resp => resp.json())
        .then(() => {
            alert(`Your comment for ${characterName} was successfully updated.`)
            commentService.getUserComments()})
        .catch(error => {
            alert(`There was an issue adding this description to your character, ${name}, due to ${error}. Please try again.`)
        });
    }

    deleteCharacterComment(event) {
        const id = event.target.nextElementSibling.id;
        const characterName = event.target.nextElementSibling.innerText.split(" - ").shift(); 

        const options = {
            method: "DELETE",
        }
    
        fetch(`${this.url}/comments/${id}`, options)
        .then(resp => resp.json())
        .then(() => {
            alert(`This comment, for ${characterName}, has been deleted.`)
            commentService.getUserComments()})
        .catch(error => {
            alert(`There was an issue removing this character from your collection due to ${error}. Please try again.`)
        });
    }
}