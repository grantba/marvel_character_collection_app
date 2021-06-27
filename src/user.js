class User {

    static loginButton = document.getElementById("login-btn");
    static signupButton = document.getElementById("signup-btn");
    static sideNav = document.querySelector(".sidenav");

    static addSideNavContent() {
        const sideNavContent = `
            <a href="#" id="my-character-collection">My Character Collection</a>
            <a href="#" id="my-comments">My Comments</a>
            <!-- <a href="#" id="projects">Projects</a>
            <a href="#" id="contact">Contact</a> -->
        `
        User.sideNav.innerHTML = sideNavContent;
    }

}