class LikeService {

    constructor(url) {
        this.url = url;
    };

    getAllLikes(character) {
        const characterInfo = character;
        fetch(`${this.url}/likes`)
        .then(resp => resp.json())
        .then(allLikes => {Like.displayCollectionCharacterLikes(allLikes, characterInfo)})
        .catch((error) => {alert(`There was an issue getting all this character's likes due to ${error}. Please try again.`)});
    };

    updateCharacterLikeStatus(likeStatus, userId, characterId, name) {
        const params = {
            "like_status": likeStatus,
            "user_id": userId,
            "character_id": characterId
        };
        const options = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params)
        };

        fetch(`${this.url}/likes/${characterId}`, options)
        .then(resp => resp.json())
        .catch(error => {alert(`There was an issue updating the like status of your character, ${name}, due to ${error}. Please try again.`)});
    };

};
