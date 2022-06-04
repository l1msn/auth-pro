class UserController{
    async registration(request,response,next){
        try {

        } catch (error){
            console.log(error)
            console.log("Error on registration")
        }
    }
    async login(request,response,next){
        try {

        } catch (error){
            console.log(error)
            console.log("Error on login")
        }
    }
    async logout(request,response,next){
        try {

        } catch (error){
            console.log(error)
            console.log("Error on logout")
        }
    }

    async activated(request,response,next){
        try {

        } catch (error){
            console.log(error)
            console.log("Error on activating user")
        }
    }
    async refresh(request,response,next){
        try {

        } catch (error){
            console.log(error)
            console.log("Error on refresh token")
        }
    }
    async getUsers(request,response,next){
        try {
            response.json("Getting users");
        } catch (error){
            console.log(error)
            console.log("Error on getting users")
        }
    }
}

module.exports = new UserController();