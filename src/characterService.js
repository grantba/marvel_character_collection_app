class CharacterService {

    constructor(url){
        this.url = url
    }

    getMarvelCharacterByName(search) {
        const ts = Number(new Date());
        const hash = md5(ts + _PRIVATE_KEY + _PUBLIC_KEY);
    
        const params = {
            "name": search,
            "ts": ts,
            "hash": hash
        }
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params)
        }
    
        fetch(`${this.url}/search_by_name`, options)
        .then(resp => resp.json())
        .then(characterInfo => {MarvelCharacter.createMarvelCharacter(characterInfo)})
        .catch(() => {
            alert("That character was not found. Please try again.")
        });
    
        const characterSearchForm = document.getElementById("marvel-character-search-form");
        characterSearchForm.reset();
    }

    getCollectionCharacter(event) {
        const id = event.target.parentElement.parentElement.parentElement.parentElement.dataset.id;
        const ts = Number(new Date());
        const hash = md5(ts + _PRIVATE_KEY + _PUBLIC_KEY);
    
        const params = {
            "id": id,
            "ts": ts,
            "hash": hash
        }
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params)
        }
    
        fetch(`${this.url}/search_by_id`, options)
        .then(resp => resp.json())
        .then(characterInfo => {debugger})
        .catch(error => {
            alert(`There was an issue adding this character to your collection due to ${error}. Please try again.`)
        });
    }
}