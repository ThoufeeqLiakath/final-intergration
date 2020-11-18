import React, { useState } from 'react';

import { Paper, Grid, Button, makeStyles, TextField } from '@material-ui/core';
// import ImageUploader from "react-images-upload";
// import NewsService from '../../services/news.service';
// import News from '../../model/News';
// import NewsApiModel from '../../model/NewsApiModel';
// import Reminder from '../../model/ReminderSchdeule';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 5,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 250,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 1200,
  },
  image: {
    width: 128,
    height: 150,
  },
  img: {
    width: 128,
    height: 128,
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));


export default function CreateNews() {
  const classes = useStyles();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [url, setUrl] = useState('');
  const [urlToImage, setUrlToImage] = useState('');
  // const [file, setFile] = useState();
  const [reminder, setReminder] = useState('');
  const [pubilshed, setPublished] = useState('');
  // const [errUrlTxt,setErrUrlTxt]=useState('');
  
  // const onDrop = (pictureFiles: any, pictureDataURLs: any) => {
  //   //console.log(pictureFiles);
  //   //console.log(pictureDataURLs[0]);
  //   if (pictureFiles.length > 1) {
  //     pictureFiles.splice(-1, 1);
  //     pictureDataURLs.splice(-1, 1);
  //   }
  // }

  // const isURL=(str:string)=> {
  //   var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
  //   '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
  //   '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
  //   '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
  //   '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
  //   '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  //   return pattern.test(str);
  // }
  const OnChangeTextBox = (e: any) => {
    e.preventDefault();
    if (e.target.name === "newstitle") {
      setTitle(e.target.value);
    }
    if (e.target.name === "newscontent") {
      setContent(e.target.value);
    }
    if (e.target.name === "newsurl") {
      setUrl(e.target.value);
    }
    if (e.target.name === "newsurltoimage") {
      setUrlToImage(e.target.value);
    }
  }
  const OnChangeDateTime = (e: any) => {
    e.preventDefault();
    if (e.target.name === "reminder") {
      setReminder(e.target.value.replace(':00Z',''));
    }
    if (e.target.name === "published") {
      setPublished(e.target.value.replace(':00Z',''));
    }
  }
  


  return (
    <div style={{ paddingTop: 80 }}> <div className={classes.root} style={{ paddingBottom: 5 }}>
      <Paper className={classes.paper} elevation={7}>
        {/* <form> onSubmit={createNews}> */}
        <form>
          <Grid container spacing={1}>

            <Grid item xs={6} sm container>
              <TextField id="newstitle"
                name="newstitle"
                required
                placeholder="Enter Title"
                onChange={OnChangeTextBox}
                value={title}></TextField>
            </Grid>
            <Grid item xs={6} sm container>
              <TextField id="newscontent"
                name="newscontent"
                required
                placeholder="Enter Content"
                onChange={OnChangeTextBox}
                value={content}></TextField>
            </Grid>

          </Grid>
          <Grid container spacing={1}>

            <Grid item xs={6} sm container>
              <TextField id="newsurl"
                name="newsurl"
                required
                type="link"
                onChange={OnChangeTextBox}
                placeholder="Enter Url"
                value={url}></TextField>
            </Grid>
            <Grid item xs={6} sm container>
              {/* <ImageUploader
                withIcon={false}
                withPreview={true}
                label=""
                buttonText="Upload Image"
                onChange={onDrop}
                imgExtension={[".jpg", ".gif", ".png", ".gif", ".svg"]}
                maxFileSize={1048576}
                fileSizeError=" file size is too big"
              /> */}
              <TextField id="newsurltoimage"
                name="newsurltoimage"
                required
                onChange={OnChangeTextBox}
                placeholder="Enter Url to Image"
                value={urlToImage}></TextField>
                {/* <TextField style={{color:"red",float:"left"}}>{errUrlTxt}</TextField> */}
            </Grid>
          </Grid>

          <Grid container spacing={1}>
            <Grid item xs={6} sm container>
              <TextField
                id="datetime-local"
                label="Reminder Schedule"
                type="datetime-local"
                name="reminder"
                onChange={OnChangeDateTime}
                defaultValue={reminder}
                style={{margin:0}}
                // defaultValue="2017-05-24T10:30"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={6} sm container>
              <TextField
                required
                id="datetime-local"
                label="Published At"
                type="datetime-local"
                name="published"
                defaultValue={pubilshed}
                // defaultValue="2017-05-24T10:30"
                style={{margin:0}}
                onChange={OnChangeDateTime}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1}>

            <Grid item xs={12} sm container>
            <Button type="submit" variant="contained"  color="secondary" style={{}}>Create News</Button>
            </Grid>
            
          </Grid>
        </form>
      </Paper>
    </div></div >
  );
}