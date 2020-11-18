import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Button, Menu, MenuItem, Grid } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import ListRoundedIcon from '@material-ui/icons/ListRounded';
import PowerSettingsNewRoundedIcon from '@material-ui/icons/PowerSettingsNewRounded';

// import Link from 'react-router';
//@ts-ignore
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: "center",
    fontSize:"large"
  },
  linkButton:
  {
    color: "white"
  },
  hide:
  {
    display: "none"
  },
  show: {
    display: "block"
  }
}));


const Header = (props: any) => {
  const classes = useStyles();
  const history=useHistory();
  const [displayFilterButton, setDisplayFilterButton] = useState<Boolean>(false);
  const [displayFilterComponent, setDisplayFilterComponent] = useState<Boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  

  const handleClose = () => {
    setAnchorEl(null);
  };
  // const [routeName,setRouteName]=useState('');
  // setDisplayFilterComponent(props.displayFilterComponent);
  if (props.displayFilterComponent !== displayFilterComponent) {
    setDisplayFilterComponent(props.displayFilterComponent);
  }
  let currentPage = () => {
    return window.location.pathname;
  }
  let page = currentPage();

  if (page.includes("dashboard")) {
    if (displayFilterButton !== true) {
      setDisplayFilterButton(true);
    }
  }
  else {
    if (displayFilterButton !== false) {
      setDisplayFilterButton(false);
    }
  }


  let filterOnClick = () => {
    setDisplayFilterComponent(!displayFilterComponent);
    props.filterButtonDisplayCallback(!displayFilterComponent);
    // //console.info(displayFilterComponent);
  }

  return (
    <div className={classes.root}>
      <Grid container>
        <AppBar>

          <Toolbar style={{padding:0}}>
            <Grid xs={2} item>
              {(localStorage.getItem("token") !== undefined && localStorage.getItem("token") !== null) ?
                <Button id="simplemenubutton" className={classes.linkButton} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                  <ListRoundedIcon />
                </Button> : null}
              {(localStorage.getItem("token") !== undefined && localStorage.getItem("token") !== null) ?
                <Menu                  
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose} ><Button style={{fontSize:"smaller"}} id="dashboard" onClick={()=>history.push("/dashboard")} >Dashboard</Button></MenuItem>
                  {displayFilterButton === true ? <MenuItem onClick={handleClose}><Button style={{fontSize:"smaller"}} id="filter" onClick={filterOnClick} >Filter Dashboard<FilterListIcon /></Button></MenuItem> : null}
                  <MenuItem onClick={handleClose}><Button id="readnow" onClick={()=>history.push("/favourites")} style={{fontSize:"smaller"}} >Favourites</Button></MenuItem>
                  {(localStorage.getItem('token') !== null && localStorage.getItem('token') !== undefined) ?
                    <MenuItem onClick={handleClose}><Button id="updateUserProfile" style={{fontSize:"smaller"}} onClick={()=>history.push("/register")}>Update User Profile</Button></MenuItem> : null}
                </Menu>
                : null}</Grid>
            <Grid item xs={10}>
              <Typography className={classes.title}>
                News Today
    </Typography>
            </Grid>
            <Grid item xs={2}>
              {(localStorage.getItem("token") !== undefined && localStorage.getItem("token") !== null) ?
                <Button color="inherit" style={{float:"right"}} className={classes.linkButton} id="signout" onClick={() => {
                  // let token = localStorage.getItem("token");
                  // if (token !== undefined && token !== null) {
                    localStorage.clear();
                    history.push('/login');
                  // }
                }}><PowerSettingsNewRoundedIcon /></Button>
                : null}
            </Grid>
          </Toolbar>

        </AppBar>
      </Grid>
    </div>);
}
export default Header;