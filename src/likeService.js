class LikeService {

    constructor(url) {
        this.url = url
    }

    updateCharacterLikeStatus(likeStatus, userId, characterId, name) {
        const params = {
            "like_status": likeStatus,
            "user_id": userId,
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
        fetch(`${this.url}/likes/${characterId}`, options)
        .then(resp => resp.json())
        // .then(characterService.getCollectionCharacters())
            // const characterInfo = result.data.attributes.character || result.data[0].attributes.like_status;
            // const likes = result.data.attributes.like_status || result.data[0].attributes.like_status;
            // CollectionCharacter.addUpdatedLikeCollectionCharacter(characterInfo, likes)})
        .catch(error => {
            alert(`There was an issue updating the like status of your character, ${name}, due to ${error}. Please try again.`)
        });
    }
}
