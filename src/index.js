const _marvelCopyright = "© 2021 MARVEL";
const _attributionText = "Data provided by Marvel. © 2021 MARVEL";
const _attributionHTML = "<a href=\"http://marvel.com\">Data provided by Marvel. © 2021 MARVEL</a>";

const _baseUrl = "http://localhost:3000";
const characterService = new CharacterService("http://gateway.marvel.com/v1/public/characters");

const sideNav = document.querySelector(".sidenav");
const characterDiv = document.getElementById("character-container");
const commentsDiv = document.getElementById("comments-container");
const header = document.querySelector(".header");
const contentArea = document.getElementById("content");

const loginButton = document.getElementById("login-btn");
const signupButton = document.getElementById("signup-btn");
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
    searchCharacters.addEventListener("click", addCharacterSearchForm);
}

addHeaderContent();

function addSideNavContent() {
    const sideNavContent = `
        <a href="#" id="my-character-collection">My Character Collection</a>
        <a href="#" id="my-comments">My Comments</a>
        <!-- <a href="#" id="projects">Projects</a>
        <a href="#" id="contact">Contact</a> -->
    `
    sideNav.innerHTML = sideNavContent;
}

addSideNavContent();

function addCharacterSearchForm() {
    if (commentsDiv.innerHTML === "" && characterDiv.innerHTML === "") {
        displaySearchForm();
    }
    else {
        characterDiv.innerHTML = "";
        commentsDiv.innerHTML = "";
    }
}

sideNav.addEventListener("click", event => {
    if (event.target.id === "my-character-collection") {
        getCollectionCharacters();
    }
    if (event.target.id === "my-comments") {
        getComments();
    }
})

function displaySearchForm() {
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
        getCharacterByName(search);
    });
}