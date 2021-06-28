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
        .then(characterInfo => CollectionCharacter.createCollectionCharacter(characterInfo))
        .catch(error => {
            alert(`There was an issue adding this character to your collection due to ${error}. Please try again.`)
        });
    }

    addCharacterToCollection(name, description, thumbnail, urls, comics, events, series) {
        const params = {
            "name": name,
            "description": description,
            "thumbnail": thumbnail,
            "urls": urls,
            "comics": comics.toString(),
            "events": events.toString(),
            "series": series.toString(),
            "user_id": 1
            // added user id for now, will change later
        }
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params)
        }
    
        fetch(`${this.url}/characters`, options)
        .then(resp => resp.json())
        .then(character => {CollectionCharacter.addCollectionCharacter(character)})
        .catch(error => {
            alert(`There was an issue adding this character to your collection due to ${error}. Please try again.`)
        });
    }

    removeCollectionCharacter(event) {
        const id = event.target.parentElement.parentElement.parentElement.parentElement.dataset.id;
        const div = event.target.parentElement.parentElement.parentElement.parentElement;
    
        const options = {
            method: "DELETE",
        }
    
        fetch(`${this.url}/characters/${id}`, options)
        .then(resp => resp.json())
        .then(character => {CollectionCharacter.removeCharacterDiv(div, character.name)})
        .catch(error => {
            alert(`There was an issue removing this character from your collection due to ${error}. Please try again.`)
        });
    }

    getCollectionCharacters() {
        fetch(`${this.url}/characters`)
        .then(resp => resp.json())
        .then(characters => CollectionCharacter.createCollectionCharacters(characters))
        .catch((error) => {
            alert(`There was an issue getting the characters from your collection due to ${error}. Please try again.`)
        });
    }
}