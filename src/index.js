const _marvelCopyright = "© 2021 MARVEL";
const _attributionText = "Data provided by Marvel. © 2021 MARVEL";
const _attributionHTML = "<a href=\"http://marvel.com\">Data provided by Marvel. © 2021 MARVEL</a>";
const _baseUrl = "http://gateway.marvel.com/v1/public/characters";

const sideNav = document.querySelector(".sidenav");
const characterDiv = document.getElementById("character-container");
const commentsDiv = document.getElementById("comments-container");
const header = document.getElementById("header");
const contentArea = document.getElementById("content");

function addHeaderContent() {
    const headerContent = `
        <a href="#" class="logo">Welcome to the Marvel Characters App</a>
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