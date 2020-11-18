export default class RegisterApiModel
{
    UserId:string;
    Password:string;
    FirstName:string;
    LastName:string;
    Email:string;
    Contact:string;

    
    constructor(username:string,password:string,fname:string,lname:string,email:string,contact:string)
    {
        this.UserId=username;
        this.Password=password;
        this.FirstName=fname;
        this.LastName=lname;
        this.Email=email;
        this.Contact=contact;
    }

}

