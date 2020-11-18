import React, { useState } from 'react';
import { makeStyles, createStyles, Grid } from '@material-ui/core';
import NewsService from '../../services/news.service';
import DisplayCard from '../displayCard/DisplayCard';
import {useHistory} from "react-router-dom";
import NewsApiModel from '../../model/NewsApiModel';
import RegisterApiModel from '../../model/RegisterApiModel';
import AuthService from '../../services/auth.service';
import ReminderSchdeule from '../../model/ReminderSchdeule';

const useStyles = makeStyles(() => 
createStyles({
    marginForReadNow:
                {
                    marginTop:80,
                    marginLeft:5,
                    marginRight:5,
                    marginBottom: 300,
                }
}))

export default function ReadNow()
{
    const history=useHistory();    
    const classes=useStyles();
    const [readNow,setReadNow]=useState<NewsApiModel[]>([]);
    const [user,setUser]=useState<RegisterApiModel>();
    const [allReminders,setAllReminders]=useState<ReminderSchdeule[]>([]);
    const newsService=new NewsService();    
    const token=localStorage.getItem("token");
    const [random, setRandom] = useState<number>(0);
    
    console.info(random);
    const refresh=()=>
    {
      //console.info('in refresh');
      setRandom(Math.random());
      setAllReminders([]);
      setReadNow([]);
    };
    
    if(localStorage.getItem('token')===null||localStorage.getItem('token')===undefined){
      history.push('/login');
    }
    if(token===undefined||token===null)
    {
        history.push('/login');
    }    
    if(user===undefined||user===null||user)
    {
        var newsApi=new AuthService().getUser();
        newsApi.then((data1) => {
          if (data1.status !== undefined && data1.status !== 201 && data1.status !== 200) {
            console.error(data1.statusText);if(data1.status===401)
            {
                localStorage.clear();
                history.push('/login');
            }            
          }
          else
          {
            if(user===undefined)
            {
              setUser(data1);
            }            
          }
        });
    }
    let getReadNow =newsService.getAllNews();
    let getAllReminders=newsService.getAllReminders();
    getReadNow.then((data)=>{
      // console.log('readNow',readNow);
        if(readNow.length===0&&data.length>0)
       {
            setReadNow(data);
            ////console.info(readNow);
            getAllReminders.then((data1)=>{
              ////console.log(data1);
              // //console.info('b',allReminders.length===0);
              if(allReminders.length===0&&data1.length>0)
              {
                  //  //console.info('a',data1);
                   setAllReminders(data1);
                   
              } 
            });
       }     
              
    });

    let list=readNow.map((element:any)=>{
      // //console.info(element);
      // //console.info(allReminders);      
      var currentRem=allReminders.find(x=>x.newsId===element.newsId);
      // //console.log(currentRem);
      //console.log('getreadnow-',element);
      //console.log('getreminder-',currentRem);
      if(currentRem===undefined)
      {
        return <Grid className="dashboradGrid" container item direction="column" alignItems="center" justify="center" sm={4} xs={12}><DisplayCard key={Math.random()} refresh={refresh} readNow={element} user={user}></DisplayCard></Grid>
      }
      else{
        return <Grid className="dashboradGrid" container item direction="column" alignItems="center" justify="center" sm={4} xs={12}><DisplayCard key={Math.random()} refresh={refresh} readNow={element} user={user} reminder={currentRem}></DisplayCard></Grid>
      }
        
    })
    
    return <div className={classes.marginForReadNow}>
    <Grid container>
            {list}
            </Grid>
    </div>;
}