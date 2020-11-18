export default class LoginApiModel
{
    UserId:string;
    Password:string;
    
    constructor(username:string,password:string)
    {
        this.UserId=username;
        this.Password=password;
        
    }
}
