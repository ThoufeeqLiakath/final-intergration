import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Input, Button, Grid, FormHelperText } from '@material-ui/core';
import AuthService from '../../services/auth.service';
import User from '../../model/User';
import VpnKeyRoundedIcon from '@material-ui/icons/VpnKeyRounded';
import LockOpenRoundedIcon from '@material-ui/icons/LockOpenRounded';
// import { Redirect } from 'react-router-dom'

export default function Login() {

    const history = useHistory();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [errorText, setErrorText] = useState('');
    // console.log('env1', process.env);

    if (localStorage.getItem("token") !== undefined && localStorage.getItem("token") !== null) {
        history.push('/dashboard');
    }

    const onChangeUserName = (e: any) => {
        e.preventDefault();
        // let name=e.target.name;
        let value = e.target.value;
        setUserName(value);
    };
    const onChangePassword = (e: any) => {
        e.preventDefault();
        // let name=e.target.name;
        let value = e.target.value;
        setPassword(value);
    };
    const onClickLogin = (e: any) => {
        localStorage.clear();
        e.preventDefault();
        let user = new User(userName, password);
        const authService = new AuthService().getToken(user);
        authService.then((data: any) => {
            setErrorText('');
            //console.info(data.status);
            if (data.status !== undefined && data.status !== 201 && data.status !== 200) {
                setErrorText(data.statusText);
            }
            else {
                //console.info(data);
                var parsedData = JSON.parse(data);
                if (parsedData.Token !== undefined) {
                    localStorage.setItem("token", parsedData.Token);
                    localStorage.setItem("password", password);
                    //console.info(localStorage.getItem("token"));
                    history.push('/dashboard');
                    // history.push('/dashboard');
                    // return <Redirect to='/dashboard' />
                }
                else {
                    localStorage.removeItem("token");
                }
            }

        });
    };
    return <div style={{ paddingTop: 80, paddingBottom: 120 }}>
        <Grid container direction="column"
            alignItems="center"
            justify="center">

            <form onSubmit={onClickLogin}>
                <Grid item>
                    <Input
                        type="text"
                        id="UserName"
                        placeholder="User Name"
                        name="UserName"
                        required
                        value={userName}
                        onChange={onChangeUserName}
                        style={{ textAlign: "center", fontSize: "smaller" }} />
                </Grid>
                <Grid item>
                    <Input
                        type="password"
                        id="password"
                        placeholder="Password"
                        required
                        name="password"
                        value={password}
                        style={{ fontSize: "smaller" }}
                        onChange={onChangePassword} />
                    <FormHelperText id="errorText" style={{ color: 'red', textAlign: 'left' }}>{errorText}</FormHelperText>
                </Grid>
                <Grid>
                    <Button variant="outlined" style={{ fontSize: "small" ,width:"100%"}} id="login" type="submit">Log In <VpnKeyRoundedIcon /></Button>
                </Grid>
                <Grid>
                    <Button variant="outlined" style={{ fontSize: "small",width:"100%" }} id="register"
                        onClick={() => {
                            // history.push("/register")
                            history.push("/register")
                        }}>Register <LockOpenRoundedIcon /></Button>
                </Grid>

            </form>
        </Grid>
            </div >
};

