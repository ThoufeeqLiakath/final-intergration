export default class News
{
    id:number;
    key:number;
    author:string;
    description:string;
    url:string;
    urlToImage:string;
    publishedAt:string;
    content:string;
    title:string;

    
    constructor( author:string,description:string,url:string,urlToImage:string,publishedAt:string,content:string,title:string)
    {
        this.id=Math.random();
        this.key=Math.random();
        this.author=author;
        this.url=url;
        this.description=description;
        this.urlToImage=urlToImage;
        this.publishedAt=publishedAt;
        this.content=content;
        this.title=title;
    }
}