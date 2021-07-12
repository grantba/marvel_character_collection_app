class User {

    static sideNav = document.querySelector(".sidenav");
    static count = 0;

    constructor(id, userName, email, bio, image) {
        this.id = id;
        this.username = userName;
        this.email = email;
        this.bio = bio;
        this.image = image;

        localStorage.setItem('currentUser', id);
        localStorage.setItem('currentUserName', userName);
        localStorage.setItem('currentUserEmail', email);

        this.element = document.createElement("div");
        this.element.id = "user-card";
        this.displayWelcomeMessage();
    };

    createDiv() {
        let image = "";
        let bio = "";

        if (this.image === "") {
            image = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
        } else {
            image = this.image;
        };

        if (this.bio === "") {
            bio = "You currently have no user bio but you can always edit your information to add one.";
        } else {
            bio = this.bio;
        };

        this.element.innerHTML = `
            <h2 id="welcome-username-${this.id}" style="border-bottom: 2px solid #CCC">You Have Entered The World Of Marvel, ${this.username.charAt(0).toUpperCase() + this.username.slice(1)}.<br> Now You Can Unleash Your Inner Super Hero!</h2>
            <img src=${image} id="welcome-userimage" width="120" height="120" alt="User's Avatar">
            <h3 id="welcome-bio">User Bio:</h3>
            <h3>${bio}</h3>
        `;
        return this.element;
    };

    displayWelcomeMessage() {
        characterDiv.innerHTML = "";
        commentsDiv.innerHTML = "";
        commentsDiv.appendChild(this.createDiv());
    };

    static createUser(user) {
        const id = parseInt(user.data.id);
        const userName = user.data.attributes.username;
        const email = user.data.attributes.email;
        const bio = user.data.attributes.bio;
        const image = user.data.attributes.image;
        
        new User(id, userName, email, bio, image);

        User.addSideNavContent();
    };

    static displaySignUpLogInMessage() {
        characterDiv.innerHTML = "";
        commentsDiv.innerHTML = "";
        const div = document.createElement("div");
        div.innerHTML = `
            <h3>Please Signup Or Login To Enjoy The World Of Marvel...<br><br> Where Everyone Can Be A Super Hero!</h3>
        `;
        div.id = "welcome";
        commentsDiv.appendChild(div);
    };

    static addSideNavContent() {
        if (localStorage.getItem('currentUser') === null) {
            User.sideNav.innerHTML = "";
        } else {
            const sideNavContent = `
                <a href="#" id="my-character-collection">My Character Collection</a>
                <a href="#" id="my-comments">My Comments</a>
                <a href="#" id="edit-my-info">Edit My Information</a>
                <a href="#" id="delete-my-info">Delete My Account</a>
            `;
            User.sideNav.innerHTML = sideNavContent;
            User.sideNav.addEventListener("click", event => User.handleSideNavClick(event));
        };
    };

    static handleSideNavClick(event) {
        if (event.target.id === "my-character-collection") {
            characterService.getCollectionCharacters();
        };
        if (event.target.id === "my-comments") {
            commentService.getUserComments();
        };
        if (event.target.id === "edit-my-info") {
            const button = event.target.id;
            const userName = localStorage.getItem('currentUserName');
            const password = "";
            const email = localStorage.getItem('currentUserEmail');
            userService.getOrSetUser(button, userName, password, email);
        };
        if (event.target.id === "delete-my-info") {
            if (User.count === 0) {
                User.count += 1;
                alert("Are you sure you want to delete your account?\n\nIf so, just click on 'Delete My Account' again and your account will be deleted...although we'll be sad to see you go!");
            } else {
                User.count = 0;
                userService.deleteCurrentUser();
            };
        };
    };

    static logOutCurrentUser() {
        const userName = localStorage.getItem('currentUserName');
        alert(`Thanks for visiting today, ${userName.charAt(0).toUpperCase() + userName.slice(1)}. Come back soon!`);
        localStorage.clear();
        addHeaderContent();
    };

    static userLogInForm() {
        const form = document.createElement("form");
        form.innerHTML = `
            <label for="username-label">Username:</label><br>
            <input type="text" id="user-username" name="username"><br><br>
            <label for="password-label">Password:</label><br>
            <input type="password" id="user-password" name="password"><br><br>  
            <input type="submit" id="user-login-form-btn" value="Log In">
        `;
        form.id = "form";
        characterDiv.innerHTML = "";
        commentsDiv.innerHTML = "";
        commentsDiv.appendChild(form);

        const userLogInForm = document.getElementById("form");
        userLogInForm.addEventListener("submit", event => {
            event.preventDefault();
            const button = event.target.querySelector("#user-login-form-btn").value;
            const userName = document.getElementById("user-username").value;
            const password = document.getElementById("user-password").value;

            if (userName && password) {
                userService.getOrSetUser(button, userName, password);
            } else {
                alert("All fields must be filled out completely to login. Please try again.");
            };
        });
    };

    static userSignUpForm() {
        const form = document.createElement("form");
        form.innerHTML = `
            <label for="username-label">Username:</label><br>
            <input type="text" id="user-username" name="username"><br><br>
            <label for="password-label">Password:</label><br>
            <input type="password" id="user-password" name="password"><br><br>
            <label for="email-label">Email:</label><br>
            <input type="text" id="user-email" name="email"><br><br>
            <label for="bio-label">Bio:</label><br>   
            <textarea id="user-bio" name="bio"></textarea><br><br> 
            <label for="image-label">Avatar Image URL:</label><br>
            <input type="text" id="user-image" name="image"><br><br>    
            <input type="submit" id="user-signup-form-btn" value="SignUp">
        `;
        form.id = "form";
        characterDiv.innerHTML = "";
        commentsDiv.innerHTML = "";
        commentsDiv.appendChild(form);

        const userSignUpForm = document.getElementById("form");
        userSignUpForm.addEventListener("submit", event => {
            event.preventDefault();
            const button = event.target.querySelector("#user-signup-form-btn").value;
            const userName = document.getElementById("user-username").value;
            const userPassword = document.getElementById("user-password").value;
            const email = document.getElementById("user-email").value;
            const bio = document.getElementById("user-bio").value;
            const image = document.getElementById("user-image").value;

            if (userName && userPassword && email) {
                userService.getOrSetUser(button, userName, userPassword, email, bio, image);
            } else {
                alert("Username, Password, and Email are required to successfully create an account. Please try again.");
            };
        });
    };

    static editUserInfoForm(user) {
        const userName = user.data.attributes.username;
        const email = user.data.attributes.email;
        const bio = user.data.attributes.bio;
        const image = user.data.attributes.image;

        const form = document.createElement("form");
        form.innerHTML = `
            <label for="username-label">Username:</label><br>
            <input type="text" id="user-username" value=${userName}><br><br>
            <label for="password-label">Password:</label><br>
            <input type="password" id="user-password" placeholder="Enter a new password if changing. Otherwise, enter current password."><br><br>
            <label for="email-label">Email:</label><br>
            <input type="text" id="user-email" value=${email}><br><br>
            <label for="bio-label">Bio:</label><br>   
            <textarea id="user-bio">${bio}</textarea><br><br> 
            <label for="image-label">Avatar Image URL:</label><br>
            <input type="text" id="user-image" value=${image}><br><br>    
            <input type="submit" id="user-edit-form-btn" value="Update Information">
        `;
        form.id = "form";
        characterDiv.innerHTML = "";
        commentsDiv.innerHTML = "";
        commentsDiv.appendChild(form);

        const userEditForm = document.getElementById("form");
        userEditForm.addEventListener("submit", event => {
            event.preventDefault();
            const formUserName = document.getElementById("user-username").value;
            const formPassword = document.getElementById("user-password").value;
            const formEmail = document.getElementById("user-email").value;
            const formBio = document.getElementById("user-bio").value;
            const formImage = document.getElementById("user-image").value;

            if (formUserName && formPassword && formEmail) {
                userService.updateCurrentUser(formUserName, formPassword, formEmail, formBio, formImage);
            } else {
                alert("Username, Password, and Email fields must be filled out completely before your account can be successfully updated. Please try again.");
            };
        });
    };

};