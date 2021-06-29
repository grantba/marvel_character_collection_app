class CommentService {

    constructor(url) {
        this.url = url
    }

    getComments() {
        debugger;
        commentsDiv.innerHTML = "";
    }

    // static getCollectionCharacterComments(character) {
    //     fetch(`${this.url}/comments`)
    //     .then(resp => resp.json())
    //     .then(allComments => displayCollectionCharacterComments(allComments, character))
    //     .catch(() => {
    //         alert("There was an issue getting this information. Please try again.")
    //     });
    // }   
}