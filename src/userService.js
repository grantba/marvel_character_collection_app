class UserService {
    
    constructor(url) {
        this.url = url
    }

    getOrSetUser(userName, email, bio, image) {
        const params = {
            "username": userName,
            "email": email,
            "bio": bio,
            "image": image
        }
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params)
        }
    
        fetch(`${this.url}/users`, options)
        .then(resp => resp.json())
        .then(user => 
            {User.createUser(user)
            addHeaderContent()})
        .catch(error => {
            alert(`There was an issue either creating or logging you into you account due to ${error}. Please try again.\n\nIf you don't have an account yet, please sign up for an account first.`)
        });
    }

}