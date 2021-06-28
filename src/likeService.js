class LikeService {

    constructor(url) {
        this.url = url
    }

    updateCharacterLikeStatus(like_status, user_id, character_id, name) {
        const params = {
            "like_status": like_status,
            "user_id": user_id,
            // added user id for now, will change later
            "character_id": character_id
        }
        const options = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params)
        }
        fetch(`${this.url}/likes/${character_id}`, options)
        .then(resp => resp.json())
        .then(result => {
            // const characterInfo = result.data.attributes.character || result.data[0].attributes.like_status;
            // const likes = result.data.attributes.like_status || result.data[0].attributes.like_status;
            characterService.getCollectionCharacters()})
            // CollectionCharacter.addUpdatedLikeCollectionCharacter(characterInfo, likes)})
        .catch(error => {
            alert(`There was an issue updating the like status of your character, ${name}, due to ${error}. Please try again.`)
        });
    }
}
