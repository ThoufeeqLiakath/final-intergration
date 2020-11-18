import NewsReminder from "./NewsReminder";

export default class NewsApiModel
{
    NewsId:number;
    Title:string;
    Content:string;
    PublishedAt:string;
    Url:string;
    UrlToImage:string;
    Reminder:NewsReminder

    
    constructor(NewsId:number,Title:string,Content:string,PublishedAt:string,Url:string,UrlToImage:string,rem:NewsReminder)
    {
        this.NewsId=NewsId;
        this.Title=Title;
        this.Content=Content;
        this.PublishedAt=PublishedAt;
        this.Url=Url;
        this.UrlToImage=UrlToImage;
        this.Reminder=rem;

    }

}

