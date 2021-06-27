class CharacterService {

    constructor(url){
        this.url = url
    }

    getCharacterByName(search) {
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
        .then(characterInfo => {Character.createCharacter(characterInfo)})
        .catch(() => {
            alert("That character was not found. Please try again.")
        });
    
        const characterSearchForm = document.getElementById("marvel-character-search-form");
        characterSearchForm.reset();
    }
}