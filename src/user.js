class User {

    static loginButton = document.getElementById("login-btn");
    static signupButton = document.getElementById("signup-btn");
    static sideNav = document.querySelector(".sidenav");

    constructor(username, email, bio, image) {
        this.username = username;
        this.email = email;
        this.bio = bio;
        this.image = image;
    }

    static addSideNavContent() {
        const sideNavContent = `
            <a href="#" id="my-character-collection">My Character Collection</a>
            <a href="#" id="my-comments">My Comments</a>
            <!-- <a href="#" id="my-likes">My Likes</a>-->
        `
        User.sideNav.innerHTML = sideNavContent;
    }

}