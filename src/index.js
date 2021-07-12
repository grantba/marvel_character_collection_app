const _BASEURL = "http://localhost:3000";
const characterService = new CharacterService(_BASEURL);
const likeService = new LikeService(_BASEURL);
const commentService = new CommentService(_BASEURL);
const userService = new UserService(_BASEURL);

const header = document.querySelector(".header");
const characterDiv = document.getElementById("character-container");
const commentsDiv = document.getElementById("comments-container");

function addHeaderContent() {
    if (localStorage.getItem('currentUser') === "null") {
        characterDiv.innerHTML = "";
        commentsDiv.innerHTML = "";
        User.sideNav.innerHTML = "";

        const headerContent = `
            <a href="#" class="logo">Welcome to the Marvel Character Collection App</a>
            <div class="header-right">
            <a href="#" id="login-btn">Login</a>
            <a href="#"id="signup-btn">Signup</a>
            </div>
        `;
        header.innerHTML = headerContent;

        const logInButton = document.getElementById("login-btn");
        logInButton.addEventListener("click", User.userLogInForm);

        const signUpButton = document.getElementById("signup-btn");
        signUpButton.addEventListener("click", User.userSignUpForm);

        User.displaySignUpLogInMessage();
    } else {
        const headerContent = `
            <a href="#" class="logo">Welcome to the Marvel Character Collection App</a>
            <div class="header-right">
            <a id="search-characters" href="#">Search Characters</a>
            <a href="#"id="logout-btn">Log Out</a>
            </div>
        `;
        header.innerHTML = headerContent;

        const searchCharacters = document.getElementById("search-characters");
        searchCharacters.addEventListener("click", getCharacterSearchForm);

        const logOutButton = document.getElementById("logout-btn");
        logOutButton.addEventListener("click", User.logOutCurrentUser);
    };
};

addHeaderContent();

function getCharacterSearchForm() {
    characterDiv.innerHTML = "";
    commentsDiv.innerHTML = "";
    MarvelCharacter.displaySearchForm();
};

User.addSideNavContent();

function getMoreInfo(event) {
    const id = event.target.parentElement.parentElement.parentElement.parentElement.dataset.id;
    if (event.target.parentElement.previousElementSibling.querySelector("h2").className === "collection-character") {
        characterService.getInfoCollectionCharacter(id);
    };
    if (event.target.parentElement.previousElementSibling.querySelector("h2").className === "marvel-collection") {
        characterService.getInfoMarvelCharacter(id);
    };
};

