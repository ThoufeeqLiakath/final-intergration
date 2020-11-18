import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Grid, Typography, Button } from '@material-ui/core';
import News from '../../model/News';
import NewsService from '../../services/news.service';
import NewsApiModel from '../../model/NewsApiModel';
import ReminderSchdeule from '../../model/ReminderSchdeule';
import Reminder from '../../model/Reminder';
import NewsReminder from '../../model/NewsReminder';
//@ts-ignore
import DateTimePicker from 'react-datetime-picker';

import { useHistory } from 'react-router-dom';
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

// @ts-ignore
const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: "75%",
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function ReminderPopup(props: any) {
  const classes = useStyles();
  const history=useHistory();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [displayReminder, setdisplayReminder] = useState(false);
  const [reminder, setReminder] = useState<Date | undefined>(undefined);
  const [alertText, setAlertText] = useState('');


  //console.info('reminderpopup', props.displayReminderPopup);
  let currentNews = props.currentNews;
  let user = props.user;

  if (open === false) {
    setOpen(props.displayReminderPopup);

  }

  const handleClose = () => {
    setOpen(false);
  };

  const OnChangeDateTime = (e: any) => {
    // e.preventDefault();
    
    ////console.info(val);
    // if (e.target.name === "reminder") {
    //   setReminder(e.target.value);
    // }    
    setReminder(e);
  }
  const handleSave = (e: any, currentNews: any) => {
    e.preventDefault();
    if (reminder !== undefined) {
      // //console.info(reminder);
      setdisplayReminder(false);
      handleReadLaterOnClick(e, currentNews);
    }
  };
  const createReminder = (e: any, newsId: number, schedule: string) => {
    e.preventDefault();
    setReminder(undefined);
    setAlertText('');
    // props.getAlertMessageCallback('');
    var reminderSchObj = new ReminderSchdeule(newsId, schedule);
    var listRem: ReminderSchdeule[] = [];
    listRem.push(reminderSchObj);
    var reminderObj = new Reminder(user.userId, user.email, listRem);
    // //console.info(reminderObj);
    var newsApi = new NewsService().createReminder(reminderObj);
    newsApi.then((data1) => {
      if (data1.status !== undefined && data1.status !== 201 && data1.status !== 200) {
        setAlertText(data1.statusText);
        //console.info('conficl cal', data1.statusText);
        props.getAlertMessageCallback(data1.statusText);
      }
      else {
        history.push('/favourites');
      }
    });
  }


  const handleReadLaterOnClick = (e: any, currentNews: News) => {
    e.preventDefault();
    setAlertText('');
    props.getAlertMessageCallback(alertText);
    var newsObj = new NewsApiModel(0, currentNews.title, currentNews.content, currentNews.publishedAt, currentNews.url, currentNews.urlToImage, new NewsReminder(null));
    var newsApi = new NewsService().createNews(newsObj, false);
    newsApi.then((data1) => {
      // //console.info(data1);
      if (data1.status !== undefined && data1.status !== 201 && data1.status !== 200) {
        setAlertText(data1.statusText);
        //console.log('ststxt', data1.statusText);
        //console.log('sts', data1.status);
        props.getAlertMessageCallback(data1.statusText);
        // handleClick(e);
        props.getReminderPopupDisplay(false);
      }
      else {
        // handleClick(e);
        props.getReminderPopupDisplay(false);
        if (reminder !== null && reminder !== undefined) {
          createReminder(e, data1, reminder.toISOString());
        }
        else {
          history.push('/favourites');
        }

      }
    });
  }


  const body = (
    <div  id="reminderpopupmodal" style={modalStyle} className={classes.paper}>
      <Grid container spacing={1} >
        <Grid item>
          <Typography id="reminderText" style={{ fontSize: "smaller" }}>
            Do you want to add reminder to the news?
                            </Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item>
          <Button id="reminderYes" variant="outlined" style={{ color: "red", float: "left", fontSize: "x-small" }} onClick={(e) => { setdisplayReminder(true); }}>Yes</Button>
        </Grid>
        <Grid item>
          <Button id="reminderNo" variant="outlined" style={{ color: "red", float: "left", fontSize: "x-small" }} onClick={(e) => { setdisplayReminder(false); setReminder(undefined); handleReadLaterOnClick(e, currentNews); }}>No</Button>
        </Grid>
        <Grid item>
          <Button id="reminderCancel" variant="outlined" style={{ color: "red", float: "left", fontSize: "x-small" }} onClick={(e) => { setdisplayReminder(false); setReminder(undefined); props.getReminderPopupDisplay(false); }}>Cancel</Button>
        </Grid>
      </Grid>
      {displayReminder ? <Grid container><Grid item style={{fontSize:"xx-small"}}>       

          <DateTimePicker
            onChange={OnChangeDateTime}
            value={reminder}
            minDate={new Date()}
            name="reminder"
            // className={classes.textField}
          />
          {/* <TextField
                            id="datetime-local"
                            label="Reminder Schedule"
                            type="datetime-local"
                            name="reminder"
                            style={{ width: 190,fontSize:"smaller" }}
                            // value={reminder}
                            
                            defaultValue={reminder}//"2017-05-24T10:30"
                            onChange={OnChangeDateTime}
                            className={classes.textField}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          /> */}

        
      </Grid> <Grid item><Button id="saveReminder" variant="outlined" style={{ color: "red", float: "left", fontSize: "x-small" }} onClick={(e) => { handleSave(e, currentNews) }}>Save</Button></Grid></Grid> : null}
      <ReminderPopup />
    </div>
  );

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
