import { Typography, Toolbar, AppBar, makeStyles } from "@material-ui/core";
import React from "react";

//@ts-ignore
const useStyles = makeStyles(theme => ({
    title: {
        flexGrow: 1,
        textAlign:"center",
        color:"white",
        fontSize:"small"
        }
}));

const Footer = () => {
    const classes = useStyles();
    return(
    <div>
        <AppBar  style={{bottom:0,top:"auto"}}>
            <Toolbar>
                <Typography className={classes.title}>
                    &copy; copyright to Cognizant
      </Typography>
            </Toolbar>
        </AppBar>
    </div>)
}
export default Footer;