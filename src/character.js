class Character {

    static displaySearchForm() {
        const form = document.createElement("form");
        form.innerHTML = `
            <label id="search-label">Search for Character By Name:</label><br><br>
            <input type="text" id="character-name" placeholder="Enter Name Here..."><br><br>
            <input type="submit" id="search-btn" value="Search">
        `
        form.id = "marvel-character-search-form";
        characterDiv.innerHTML = "";
        commentsDiv.innerHTML = "";
        commentsDiv.appendChild(form);
        
        const characterSearchForm = document.getElementById("marvel-character-search-form");
        characterSearchForm.addEventListener("submit", event => {
            event.preventDefault();
            const search = document.getElementById("character-name").value;
            characterService.getCharacterByName(search);
        });
    }
}