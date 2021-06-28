const _marvelCopyright = "© 2021 MARVEL";
const _attributionText = "Data provided by Marvel. © 2021 MARVEL";
const _attributionHTML = "<a href=\"http://marvel.com\">Data provided by Marvel. © 2021 MARVEL</a>";

const _baseUrl = "http://localhost:3000";
const characterService = new CharacterService(_baseUrl);
const likeService = new LikeService(_baseUrl);
// const characterService = new CharacterService("http://gateway.marvel.com/v1/public/characters");

const header = document.querySelector(".header");
const contentArea = document.getElementById("content");
const characterDiv = document.getElementById("character-container");
const commentsDiv = document.getElementById("comments-container");
const searchButton = document.getElementById("search-btn");

function addHeaderContent() {
    const headerContent = `
        <a href="#" class="logo">Welcome to the Marvel Character Collection App</a>
        <div class="header-right">
        <a id="search-characters" href="#">Search Characters</a>
        <a href="#" id="login-btn">Login</a>
        <a href="#"id="signup-btn">Signup</a>
        </div>
    `
    header.innerHTML = headerContent;

    const searchCharacters = document.getElementById("search-characters");
    searchCharacters.addEventListener("click", getCharacterSearchForm);
}

addHeaderContent();

function getCharacterSearchForm() {
    characterDiv.innerHTML = "";
    commentsDiv.innerHTML = "";
    MarvelCharacter.displaySearchForm();
}

User.addSideNavContent();

User.sideNav.addEventListener("click", event => {
    if (event.target.id === "my-character-collection") {
        characterService.getCollectionCharacters();
    }
    if (event.target.id === "my-comments") {
        commentService.getComments();
    }
})

function addMoreInfoButtonListener() {
    const infoButtons = document.getElementsByClassName("more-info-btn");
    for (const button of infoButtons) {
        button.addEventListener("click", event => characterService.getMoreInfo(event));
    }
}
