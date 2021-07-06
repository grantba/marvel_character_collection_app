class User {

    static sideNav = document.querySelector(".sidenav");

    constructor(id, userName, email, bio, image) {
        this.id = id;
        this.username = userName;
        this.email = email;
        this.bio = bio;
        this.image = image;

        this.element = document.createElement("div");
        this.element.id = "user-card";
        this.displayWelcomeMessage();
    }

    createDiv() {
        let image = "";
        let bio = "";
        debugger;
        if (this.image === "null" || this.image === null || this.image === undefined || this.image === "") {
            image = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
        }
        else {
            image = this.image;
        }

        if (this.bio === "null" || this.bio === null || this.bio === undefined || this.bio === "") {
            bio = "You currently have no user bio but you can always edit your information to add one."
        }
        else {
            bio = this.bio;
        }

        this.element.innerHTML = `
            <h2 id="welcome-username-${this.id}" style="border-bottom: 2px solid #CCC">You Have Entered The World Of Marvel, ${this.username.charAt(0).toUpperCase() + this.username.slice(1)}.<br> Now You Can Unleash Your Inner Super Hero!</h2>
            <img src=${image} id="welcome-userimage" width="120" height="120" alt="User's Avatar">
            <h3 id="welcome-bio">User Bio:</h3>
            <h3>${bio}</h3>
        `
        return this.element;
    }

    displayWelcomeMessage() {
        characterDiv.innerHTML = "";
        commentsDiv.innerHTML = "";
        commentsDiv.appendChild(this.createDiv());
    }

    static createUser(user) {
        const id = parseInt(user.data.id);
        const userName = user.data.attributes.username;
        const email = user.data.attributes.email;
        const bio = user.data.attributes.bio;
        const image = user.data.attributes.image;

        localStorage.setItem('currentUser', user.data.id);
        localStorage.setItem('currentUserName', user.data.attributes.username);
        
        new User(id, userName, email, bio, image);

        User.addSideNavContent();
    }

    static displaySignUpLogInMessage() {
        characterDiv.innerHTML = "";
        commentsDiv.innerHTML = "";
        const div = document.createElement("div");
        div.innerHTML = `
            <h3>Please Signup Or Login To Enjoy The World Of Marvel...<br><br> Where Everyone Can Be A Super Hero!</h3>
        `
        div.id = "welcome";
        commentsDiv.appendChild(div);
    }

    static addSideNavContent() {
        if (localStorage.getItem('currentUser') === "null") {
            User.sideNav.innerHTML = "";
        }
        else {
            const sideNavContent = `
                <a href="#" id="my-character-collection">My Character Collection</a>
                <a href="#" id="my-comments">My Comments</a>
                <a href="#" id="edit-my-info">Edit My Information</a>
                <a href="#" id="delete-my-info">Delete My Account</a>
            `
            User.sideNav.innerHTML = sideNavContent;

            User.sideNav.addEventListener("click", event => {
                if (event.target.id === "my-character-collection") {
                    characterService.getCollectionCharacters();
                }
                if (event.target.id === "my-comments") {
                    commentService.getUserComments();
                }
                if (event.target.id === "edit-my-info") {
                    userService.getUser();
                }
                if (event.target.id === "delete-my-info") {
                    userService.deleteCurrentUser();
                }
            })
        }
    }

    static logOutCurrentUser() {
        const userName = localStorage.getItem('currentUserName');
        alert(`Thanks for visiting today, ${userName.charAt(0).toUpperCase() + userName.slice(1)}. Come back soon!`);
        localStorage.setItem('currentUser', "null");
        localStorage.setItem('currentUserName', "null");
        addHeaderContent();
    }

    static userLogInForm() {
        const form = document.createElement("form");
        form.innerHTML = `
            <label for="username-label">Username:</label><br>
            <input type="text" id="user-username" name="username"><br><br>
            <label for="email-label">Email:</label><br>
            <input type="text" id="user-email" name="email"><br><br>  
            <input type="submit" id="user-login-form-btn" value="Log In">
        `
        form.id = "form";
        characterDiv.innerHTML = "";
        commentsDiv.innerHTML = "";
        commentsDiv.appendChild(form);

        const userLogInForm = document.getElementById("form");
        userLogInForm.addEventListener("submit", event => {
            event.preventDefault();
            const userName = document.getElementById("user-username").value;
            const email = document.getElementById("user-email").value;
            userService.getOrSetUser(userName, email);
        });
    }

    static userSignUpForm() {
        const form = document.createElement("form");
        form.innerHTML = `
            <label for="username-label">Username:</label><br>
            <input type="text" id="user-username" name="username"><br><br>
            <label for="email-label">Email:</label><br>
            <input type="text" id="user-email" name="email"><br><br>
            <label for="bio-label">Bio:</label><br>   
            <textarea id="user-bio" name="bio"></textarea><br><br> 
            <label for="image-label">Avatar Image URL:</label><br>
            <input type="text" id="user-image" name="image"><br><br>    
            <input type="submit" id="user-signup-form-btn" value="SignUp">
        `
        form.id = "form";
        characterDiv.innerHTML = "";
        commentsDiv.innerHTML = "";
        commentsDiv.appendChild(form);

        const userSignUpForm = document.getElementById("form");
        userSignUpForm.addEventListener("submit", event => {
            event.preventDefault();
            const userName = document.getElementById("user-username").value;
            const email = document.getElementById("user-email").value;
            const bio = document.getElementById("user-bio").value;
            const image = document.getElementById("user-image").value;
            userService.getOrSetUser(userName, email, bio, image);
        });
    }

    static editUserInfoForm(user) {
        const userName = user.data.attributes.username;
        const bio = user.data.attributes.bio;
        const image = user.data.attributes.image;

        const form = document.createElement("form");
        form.innerHTML = `
            <label for="username-label">Username:</label><br>
            <span><input type="text" id="user-username" value=${userName}><br><br>
            <label for="email-label">Email:</label><br>
            <input type="text" id="user-email" placeholder="If changing, enter new email. Otherwise, enter current email."></span><br><br>
            <span><label for="bio-label">Bio:</label><br>   
            <textarea id="user-bio">${bio}</textarea><br><br> 
            <label for="image-label">Avatar Image URL:</label><br>
            <input type="text" id="user-image" value=${image}></span><br><br>    
            <input type="submit" id="user-edit-form-btn" value="Update Information">
        `
        form.id = "form";
        characterDiv.innerHTML = "";
        commentsDiv.innerHTML = "";
        commentsDiv.appendChild(form);

        const userEditForm = document.getElementById("form");
        userEditForm.addEventListener("submit", event => {
            event.preventDefault();
            const formUserName = document.getElementById("user-username").value;
            const formEmail = document.getElementById("user-email").value;
            const formBio = document.getElementById("user-bio").value;
            const formImage = document.getElementById("user-image").value;

            if (formUserName && formEmail) {
                userService.updateCurrentUser(formUserName, formEmail, formBio, formImage)
            }
            else {
                alert("Username and Email fields must be filled out completely before your account can be successfully updated. Please try again.")
            }
        });
    }

}