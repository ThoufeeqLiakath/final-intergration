import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Alert } from '@material-ui/lab';
import ReminderPopup from '../ReminderPopup/ReminderPopup';
import { Link, Grid } from '@material-ui/core';


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

export default function DashboardCard(props: any) {
  const classes = useStyles();
  console.info('card prop', props);
  // const history=useHistory();
  const [alertText, setAlertText] = useState('');
  const [displayReminderPopup, setDisplayReminderPopup] = useState(false);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {

    setDisplayReminderPopup(!displayReminderPopup);
    //setdisplayReminder(false);
    //setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const getAlertMessageCallback = (msg: string) => {
    //console.info('mssssg',msg);
    setAlertText(msg);
  }
  const getReminderPopupDisplay = (display: boolean) => {
    setDisplayReminderPopup(display);
  }

  // let displayDescription: Boolean = true;
  // let newsList: News[] = [];
  if (props !== undefined) {
    let prop = props.currentNews;
    // newsList =
    //     prop.map((element: News) => {
    //         // <div>element</div>
    //         if (element !== undefined) {
    let currentNews = prop;



    return (

      <Card className={classes.root}>
        {displayReminderPopup ?

          <ReminderPopup displayReminderPopup={true} currentNews={props.currentNews} user={props.user} getAlertMessageCallback={getAlertMessageCallback} getReminderPopupDisplay={getReminderPopupDisplay} ></ReminderPopup> 
          : null}


        <CardActionArea>
          <CardMedia
            component="img"
            alt={currentNews.title}
            height="120"
            image={currentNews.urlToImage}
            title={currentNews.title}

          />
          <CardContent style={{ padding: 2 }}>
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
            <Grid item xs={12} sm={12}>{alertText === '' ? null :
              <Alert severity="error" style={{ fontSize: "smaller" }}>
                {alertText}
              </Alert>
            }</Grid>
            <Grid item xs={12} sm={12}>
              <Button className="favouriteBtn" variant="outlined" style={{ color: "red", float: "left", fontSize: "smaller" }} onClick={(e) => { handleClick(e) }}>
                Add Favourite
        </Button>
            </Grid>
          </Grid>

          {/* <Button size="small" color="primary">
            Learn More
        </Button> */}
        </CardActions>
      </Card>
    );
  }
  else {
    return <div> "News Card component not working!!"</div>;
  }
}
