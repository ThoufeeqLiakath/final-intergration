import ReminderSchdeule from "./ReminderSchdeule";

export default class Reminder
{
    // id:number;
    UserId:string;
    Email:string;
    NewsReminders:ReminderSchdeule[]

    constructor(userId:string,email:string,newsRems:ReminderSchdeule[])
    {
        // this.id=Math.random();
        this.UserId=userId;
        this.Email=email;
        this.NewsReminders=newsRems;
    }
}