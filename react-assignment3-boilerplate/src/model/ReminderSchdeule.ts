export default class ReminderSchdeule
{
    schedule:string|null;
    newsId:number;
    constructor(newsId:number, sch:string|null)
    {
        this.schedule=sch;
        this.newsId=newsId;
    }
}