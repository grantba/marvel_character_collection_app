class UserService {
    
    constructor(url) {
        this.url = url;
    };

    getOrSetUser(button, userName, password, email, bio, image) {
        let message = "";
        if (button === "SignUp") {
            message = "Your new user account has been created.";
        };

        const params = {
            "button": button,
            "username": userName,
            "password": password,
            "email": email,
            "bio": bio,
            "image": image
        };
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params)
        };
    
        fetch(`${this.url}/users`, options)
        .then(resp => resp.json())
        .then(user => {
            if (user.errors) {
                throw new Error(user.errors)
            } else {
                if (button === "edit-my-info") {
                    User.editUserInfoForm(user);
                } else {
                    User.createUser(user);
                    addHeaderContent();
                    if (message !== "") {
                        alert(`${message}`);
                    };
                };
            }
        })
        .catch(error => alert(`${error.message.replace("., ", ".\n")}\n\nPlease try again.`));
    };

    updateCurrentUser(formUserName, formPassword, formEmail, formBio, formImage) {
        const userId = localStorage.getItem('currentUser');
        
        const params = {
            "username": formUserName,
            "password": formPassword,
            "email": formEmail,
            "bio": formBio,
            "image": formImage
        };
        const options = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params)
        };
    
        fetch(`${this.url}/users/${userId}`, options)
        .then(resp => resp.json())
        .then(user => {
            new User(user.data.id, user.data.attributes.username, user.data.attributes.email, user.data.attributes.bio, user.data.attributes.image);
            alert("Your account information has been updated successfully.");
        })
        .catch(error => {alert(`There was an issue updating your account inforamtion due to ${error}. Please try again.`)});
    };

    deleteCurrentUser() {
        const userId = localStorage.getItem('currentUser');
        const userName = localStorage.getItem('currentUserName'); 

        const options = {
            method: "DELETE",
        };
    
        fetch(`${this.url}/users/${userId}`, options)
        .then(resp => resp.json())
        .then(() => {
            localStorage.clear();
            addHeaderContent();
            alert(`${userName.charAt(0).toUpperCase() + userName.slice(1)}, your account has been deleted. We're sad to see you go, but thanks for visiting!`);
        })
        .catch(error => {alert(`There was an issue deleting your account due to ${error}. Please try again.`)});
    };

};