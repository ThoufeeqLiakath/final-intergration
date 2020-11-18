import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, Link, Grid, Button, Tooltip } from '@material-ui/core';
import NewsService from '../../services/news.service';
import Reminder from '../../model/Reminder';
import ReminderSchdeule from '../../model/ReminderSchdeule';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import AlarmAddIcon from '@material-ui/icons/AlarmAdd';
import AlarmOffIcon from '@material-ui/icons/AlarmOff';
// import DateTimePicker from 'react-date-picker';
// @ts-ignore
//import TimePicker from 'react-time-picker';
// @ts-ignore
import DateTimePicker from 'react-datetime-picker';
// let DateTimePicker1=require('react-date-picker');

const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
    height: "100%",
    margin: 7,
    border: "ridge",
    borderColor: "aliceblue",
    padding: 7
  },
});


export default function DisplayCard(props: any) {
  
  const classes = useStyles();
  const history = useHistory();
  // const readNow = props.readNow;
  const [reminder, setReminder] = useState<Date | undefined>(undefined);
  const [displayDeleteNews, setDisplayDeleteNews] = useState(false);

  //const [displayReminder, setDisplayReminder] = useState(false);
  let user = props.user;
  //console.info('rerendering display card');

  if (reminder === undefined) {
    if (props.reminder !== undefined && props.reminder.schedule !== undefined) {
      // //console.info(props.reminder.schedule.replace(':00Z',''));
      setReminder(new Date(props.reminder.schedule));
      setDisplayDeleteNews(true);
    }
  }



  let handleUpdateReminder = (event: any, currentNews: any) => {
    event.preventDefault();
    if (reminder !== undefined && reminder !== null) {
      // //console.log(currentNews);
      var remSced = new ReminderSchdeule(currentNews.newsId, reminder !== undefined ? reminder.toISOString() : '');
      var newsApi = new NewsService().updateReminder(remSced);
      newsApi.then((data1) => {
        if (data1.status !== undefined && data1.status !== 201 && data1.status !== 200) {
          console.error(data1.statusText);
          if (data1.status === 404) {
            var reminderSchObj = new ReminderSchdeule(currentNews.newsId, reminder !== undefined ? reminder.toISOString() : '');
            var listRem: ReminderSchdeule[] = [];
            listRem.push(reminderSchObj);
            var reminderObj = new Reminder(user.userId, user.email, listRem);

            var newsApi = new NewsService().createReminder(reminderObj);
            newsApi.then((data1) => {
              if (data1.status !== undefined && data1.status !== 201 && data1.status !== 200) {
                console.error(data1.statusText);
              }
              else {
                props.refresh();
                history.push('/favourites');

                // props.refresh();
              }
            });
          }
        }
        else {
          props.refresh();
          history.push('/favourites');
          // props.refresh();
        }
      });

    }

  }

  let handleDeleteReminder = (event: any, currentNews: any) => {
    // //console.log(currentNews);
    var newsApi = new NewsService().deleteReminder(currentNews.newsId);
    newsApi.then((data1) => {
      if (data1.status !== undefined && data1.status !== 201 && data1.status !== 200) {
        console.error(data1.statusText);
      }
      else {
        //console.log('deleted', data1);
        props.refresh();
        history.push('/favourites');
        // props.refresh();
      }
    });

  }

  let handleDeleteNews = (event: any, currentNews: any) => {
    event.preventDefault();
    // //console.log(currentNews);
    var newsApi = new NewsService().deleteNews(currentNews.newsId);

    newsApi.then((data1) => {
      if (data1.status !== undefined && data1.status !== 201 && data1.status !== 200) {
        console.error(data1.statusText);
      }
      else {
        //console.log('deleted', data1);
        if (data1) {
          var newsApi = new NewsService().deleteReminder(currentNews.newsId);
          newsApi.then((data2) => {
            if (data2.status !== undefined && data2.status !== 201 && data2.status !== 200) {
              console.error(data2.statusText);
            }
            props.refresh();
            history.push('/favourites');
            // props.refresh();

          });

        }

      }
    });

  }

  const OnChangeDateTime = (e: any) => {
    // e.preventDefault();

    ////console.info(val);
    // if (e.target.name === "reminder") {
    //   setReminder(e.target.value);
    // }    
    setReminder(e);
  }
  // const OnChangeDateTime = (e: any) => {
  //   e.preventDefault();
  //   //console.log('onchangereminder', e.target.value);
  //   if (e.target.name === "reminder") {
  //     setReminder(e.target.value.replace(':00Z', ''));
  //   }

  // }
  let prop = props.readNow;
  let currentNews = prop;
  // //console.info('reminderValue',reminder);

  // //console.info(props);
  //console.info('remin', reminder);


  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={currentNews.title}
          height="120"
          image={currentNews.urlToImage}
          title={currentNews.title}

        />
        <CardContent style={{ padding: 2 }}>
          <Tooltip style={{ float: "right" }} title="Delete News"><Button className="deleteNews" color="secondary" style={{ float: "right", fontSize: "x-small" }} onClick={(e) => { handleDeleteNews(e, currentNews) }}><DeleteForeverIcon /> News</Button></Tooltip>
          <Typography gutterBottom style={{ float: "left", fontSize: "large" }}>
            {currentNews.title}
          </Typography>
          <Typography color="textSecondary" style={{ fontSize: "smaller", display: "inline-block" }} >
            {currentNews.content}
          </Typography>
          <Typography color="textSecondary" style={{ fontSize: "smaller", display: "inline-block" }}>
            <Link className="cardLink" style={{ overflowWrap: "break-word" }} href={currentNews.url} target="_blank">{currentNews.url}</Link>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions style={{ padding: 2, justifyContent: "flex-end", display: "flex" }}>
        <Grid container>
          <Grid item xs={12} sm={12}><Grid item xs={12} style={{ fontSize: "x-small" }}>

            <DateTimePicker
              onChange={OnChangeDateTime}
              value={reminder}
              minDate={new Date()}
              name="reminder"
             className="datetimepicker"
            /></Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Tooltip title="Update Reminder"><Button variant="outlined" className="updateReminder" style={{ color: "red", fontSize: "x-small" }} onClick={(e) => { handleUpdateReminder(e, currentNews) }}>Update <AlarmAddIcon /></Button></Tooltip>                      
            {displayDeleteNews ? <Tooltip title="Delete Reminder"><Button variant="outlined" className="deleteReminder" style={{ color: "red", fontSize: "x-small" }} onClick={(e) => { handleDeleteReminder(e, currentNews) }} >Delete <AlarmOffIcon /></Button></Tooltip> : null}
          </Grid>
        </Grid>

        {/* <Button size="small" color="primary">
            Learn More
        </Button> */}
      </CardActions>
    </Card>
  );
}
