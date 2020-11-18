import News from "../model/News";
import NewsDataModel from "../model/NewsDataModel";
import FilterModel from "../model/FilterModel";
import NewsApiModel from "../model/NewsApiModel";
import Reminder from "../model/Reminder";
import ReminderSchdeule from "../model/ReminderSchdeule";

export default class NewsService {

    private mapNews = (currentNews: any) => {
        return new News(currentNews.author,
            currentNews.description,
            currentNews.url,
            (currentNews.urlToImage===null||currentNews.urlToImage===undefined||currentNews.urlToImage==="" )?"https://image.shutterstock.com/image-vector/no-image-available-vector-illustration-600w-744886198.jpg":currentNews.urlToImage,
            currentNews.publishedAt,
            currentNews.content,
            (currentNews.title===null||currentNews.title===undefined||currentNews.title==="" )?currentNews.description:currentNews.title);
    };

    createNews=(news:NewsApiModel,inUpdate:Boolean)=>{
        let method="POST";
        let uri="http://localhost:5001/api/news";        
        let headers = new Headers();
        var token1=localStorage.getItem('token');
        
        if(inUpdate)
        {
            method="PUT";
        }

    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');    
    headers.append('Origin','http://localhost:3000');
    headers.append('Authorization',`Bearer ${token1}`);    
        
        
        return fetch(uri,{
            method:method,
            body:JSON.stringify(news),
            // mode:'cors',
            headers: headers,
        }).then((data)=>{
            // //console.info(data);
            
            if(data.status!==201&&data.status!==200)
            {
                return data;
            }            
            return data.json();
        }).then((data)=>{
            return data;
        })
    };
    deleteNews=(newsId:number)=>{
        let method="DELETE";
        let uri=`http://localhost:5001/api/news/${newsId}`;        
        let headers = new Headers();
        var token1=localStorage.getItem('token');
        

    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');    
    headers.append('Origin','http://localhost:3000');
    headers.append('Authorization',`Bearer ${token1}`);    
        
        
        return fetch(uri,{
            method:method,
            //body:JSON.stringify(news),
            // mode:'cors',
            headers: headers,
        }).then((data)=>{
            ////console.info(data);
            
            if(data.status!==201&&data.status!==200)
            {
                return data;
            }            
            return data.json();
        }).then((data)=>{
            return data;
        })
    };

    getAllNews=()=>{
        let method="GET";
        let uri="http://localhost:5001/api/news";        
        let headers = new Headers();
        var token1=localStorage.getItem('token');
        
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');    
    headers.append('Origin','http://localhost:3000');
    headers.append('Authorization',`Bearer ${token1}`);    
        
        
        return fetch(uri,{
            method:method,
            headers: headers,
        }).then((data)=>{
            ////console.info(data);
            
            if(data.status!==201&&data.status!==200)
            {
                return data;
            }            
            return data.json();
        }).then((data)=>{
            return data;
        })
    };

    getAllReminders=()=>{
        let method="GET";
        let uri="http://localhost:5003/api/reminder";        
        let headers = new Headers();
        var token1=localStorage.getItem('token');
        
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');    
    headers.append('Origin','http://localhost:3000');
    headers.append('Authorization',`Bearer ${token1}`);    
        
        
        return fetch(uri,{
            method:method,
            headers: headers,
        }).then((data)=>{
            
            
            if(data.status!==201&&data.status!==200)
            {
                return data;
            }                        
            return data.json();
        }).then((data)=>{
            return data;
        })
    };

    getReadNow = () => {

        var token=localStorage.getItem("token");
        const uri = " http://localhost:3001/api/v1/news";
        return fetch(uri, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        }).then((data) => {

            if (data.status === 200) {
                let json = data.json();
                return Promise.resolve(json);
            }
            else {
                return Promise.reject(`${data.status}:${data.statusText}`);
            }
        }).then((data) => {
            // //console.info(data);
            let content = data;
            let readNow = content.map((element: any) => { return new NewsDataModel(element.description, element.url) });
            // //console.info(readNow);
            return readNow;
        });
    };

    saveNewsData = (news: any) => {
        // //console.info(news);
        // const uri = "http://localhost:3001/news";
        var token1=localStorage.getItem("token");
        const uri = " http://localhost:3001/api/v1/news";
        return fetch(uri, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token1}`,
            },
            body: JSON.stringify(news)
        }).then((data) => {
            if (data.status === 200) {
                let json = data.json();
                return Promise.resolve(json);
            }
            else {
                return Promise.reject(`${data.status}:${data.statusText}`);
            }

        }).then((data) => {
            ////console.log(data);
            return data;

        });
    };
    createReminder = (reminder:Reminder) => {
        let method="POST";
        let uri=`http://localhost:5003/api/reminder`;        
        let headers = new Headers();
        var token1=localStorage.getItem('token');        

    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');    
    headers.append('Origin','http://localhost:3000');
    headers.append('Authorization',`Bearer ${token1}`);    
        
        
        return fetch(uri,{
            method:method,
            body:JSON.stringify(reminder),
            // mode:'cors',
            headers: headers,
        }).then((data)=>{
            ////console.info(data);
            
            if(data.status!==201&&data.status!==200)
            {
                return data;
            }            
            return data.json();
        }).then((data)=>{
            return data;
        });
    };



    updateReminder = (reminder:ReminderSchdeule) => {
        let method="PUT";
        let uri=`http://localhost:5003/api/reminder`;        
        let headers = new Headers();
        var token1=localStorage.getItem('token');        

    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');    
    headers.append('Origin','http://localhost:3000');
    headers.append('Authorization',`Bearer ${token1}`);    
        
        //console.info(JSON.stringify({NewsId:reminder.newsId,Schedule:reminder.schedule}));
        return fetch(uri,{
            method:method,
            body:JSON.stringify({NewsId:reminder.newsId,Schedule:reminder.schedule}),
            // mode:'cors',
            headers: headers,
        }).then((data)=>{
            ////console.info(data);
            
            if(data.status!==201&&data.status!==200)
            {
                return data;
            }            
            return data.json();
        }).then((data)=>{
            return data;
        });
    };


    deleteReminder = (newsId: number)=>{
        let method="DELETE";
        let uri=`http://localhost:5003/api/reminder?newsId=${newsId}`;        
        let headers = new Headers();
        var token1=localStorage.getItem('token');  
        

    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');    
    headers.append('Origin','http://localhost:3000');
    headers.append('Authorization',`Bearer ${token1}`);    
        
        
        return fetch(uri,{
            method:method,
            // body:JSON.stringify(obj),
            // mode:'cors',
            headers: headers,
        }).then((data)=>{
            ////console.info(data);
            
            if(data.status!==201&&data.status!==200)
            {
                return data;
            }            
            return data.json();
        }).then((data)=>{
            return data;
        });
    };

    getNews = async (typ: string, model: FilterModel) => {
        let uri = "http://newsapi.org/v2/everything?apiKey=8eef926b47a84572bb4f12659be245f9";
        // switch (typ) {
        //     case "everything": uri = "http://newsapi.org/v2/everything?apiKey=8eef926b47a84572bb4f12659be245f9"; break;
        //     case "topNews": uri = "http://newsapi.org/v2/top-headlines?country=us&apiKey=8eef926b47a84572bb4f12659be245f9"; break;
        //     default: uri = "http://localhost:5000/articles"; break;
        // }

        if (model !== null && model !== undefined && model.endPoints !== null && model.endPoints !== undefined && model.endPoints !== "") {
            if (model.endPoints === "Top") {
                uri = "http://newsapi.org/v2/top-headlines?apiKey=8eef926b47a84572bb4f12659be245f9";
            }
            if (model.endPoints === "Everything") {
                uri = "http://newsapi.org/v2/everything?apiKey=8eef926b47a84572bb4f12659be245f9";
            }
            if (model.endPoints === "Sources") {
                uri = "http://newsapi.org/v2/sources?apiKey=8eef926b47a84572bb4f12659be245f9";
            }
        }



        if (model !== null && model !== undefined && model.country === "" && model.category === "" && model.keywords === "" && model.endPoints !== "Sources" && model.sources === "") {
            uri = uri + '&q=a';
        }
        else {
            if (model === null || model === undefined) {
                uri = uri + '&q=a';
            }
            else {
                if (model.country !== "") {
                    uri = uri + '&country=' + model.country;
                }
                if (model.category !== "") {
                    uri = uri + '&category=' + model.category;
                }
                if (model.keywords !== "") {
                    uri = uri + '&q=' + model.keywords;
                }
                if (model.sources !== "") {
                    uri = uri + '&sources=' + model.sources;
                }
            }

        }
        if(model!==null&&model!==undefined&&model.slider!==null&&model.slider!==undefined&&model.slider>0)
        {
         uri=uri+'&pageSize='+model.slider;
        }
        if(model!==null&&model!==undefined&&model.page!==null&&model.page!==undefined&&model.page>0)
        {
         uri=uri+'&page='+model.page;
        }
        // //console.info(uri);
        let fetchResult = fetch(uri);
        return await fetchResult.then((data) => {
            if (data.status === 200) {
                let json = data.json();
                return Promise.resolve(json);
            }
            else {
                return Promise.reject(`${data.status}:${data.statusText}`);
            }

        })
            .then((data) => {
                if (typ === "") {
                    let test: any;
                    test = data;
                    return test;
                }
                else {
                    let articles = data.articles;
                    if(articles===undefined)
                    {
                        articles=data.sources;
                    }
                    // let articles=data;
                    let news: News[] = articles.map((current: any) => { return this.mapNews(current) });
                    return news;
                    // //console.info(test);
                }


            }).catch((err)=>{
                return err;
            });
    };
}

