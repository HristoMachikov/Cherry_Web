const userService = {
    post: function ( body, isSignIn) {
        return fetch(`http://localhost:4000/user/${isSignIn ? "login" : "register"}`,
            {
                method: "post",
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => {
                return res.json()
            }).catch((myErr) => console.error(myErr));
    }
};

export default userService;