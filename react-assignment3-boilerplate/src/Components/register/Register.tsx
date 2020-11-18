import React, { useState } from 'react';
import { Input, Button, Grid, FormHelperText } from '@material-ui/core';
import AuthService from '../../services/auth.service';
import RegisterApiModel from '../../model/RegisterApiModel';
import LoginApiModel from '../../model/LoginApiModel';
import VpnKeyRoundedIcon from '@material-ui/icons/VpnKeyRounded';
import LockOpenRoundedIcon from '@material-ui/icons/LockOpenRounded';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Tooltip from '@material-ui/core/Tooltip';
import { useHistory } from 'react-router-dom';
// import Alert from '@material-ui/lab/Alert';


export default function Register() {
    const history=useHistory();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [contact, setContact] = useState('');
    const [pwdMismatchErrorText, setPwdMismatchErrorText] = useState('');
    const [contactErrorText, setcontactErrorText] = useState('');
    const [emailErrorText, setEmailErrorText] = useState('');
    const [buttonName, setbuttonName] = useState('');
    const inUpdate = (localStorage.getItem('token') !== null && localStorage.getItem('token') !== undefined);
    if (buttonName === '') {
        if (inUpdate) {
            setbuttonName('Update');
            var aythService = new AuthService().getUser();
            aythService.then((data: any) => {
                //console.info('inside success', data);
                setUserName(data.userId);
                setFirstName(data.firstName);
                setLastName(data.lastName);
                setContact(data.contact);
                let pwd=localStorage.getItem("password");
                setPassword(pwd===null?'':pwd);
                setConfirmPassword(pwd===null?'':pwd);
                setEmail(data.email);
            })
        }
        else {
            setbuttonName('Register');
        }
    }

    // const history=useHistory();
    const onChangeUserName = (e: any) => {
        e.preventDefault();
        // let name=e.target.name;
        let value = e.target.value;
        setUserName(value);
    };
    const onChangeFirstName = (e: any) => {
        e.preventDefault();
        // let name=e.target.name;
        let value = e.target.value;
        setFirstName(value);

    };
    const onChangeLastName = (e: any) => {
        e.preventDefault();
        // let name=e.target.name;
        let value = e.target.value;
        setLastName(value);
    };
    const onChangeContact = (e: any) => {
        e.preventDefault();
        //console.info(e.target.value);

        if ((e.target.value.length > 10)) {
            return false;
        }
        // let name=e.target.name;
        let value = e.target.value;
        setContact(value);
    };
    const onChangeEmail = (e: any) => {
        e.preventDefault();
        // let name=e.target.name;
        let value = e.target.value;
        setEmail(value);
    };

    const onChangePassword = (e: any) => {
        setPwdMismatchErrorText('');
        e.preventDefault();
        // let name=e.target.name;
        let value = e.target.value;
        setPassword(value);

    };
    const onChangeConfirmPassword = (e: any) => {
        e.preventDefault();
        setPwdMismatchErrorText('');
        // let name=e.target.name;
        let value = e.target.value;
        setConfirmPassword(value);

    };
    const onClickRegister = (e: any) => {
        //console.info('onClickRegister');
        //console.info('update', inUpdate);
        //console.info(email);
        e.preventDefault();
        var isnum = /^\d+$/.test(contact);
        if (password !== confirmPassword ){//&& !inUpdate) {
            setPwdMismatchErrorText('Passwords not matching');
        }
        else if (!isnum || contact.length !== 10) {
            setPwdMismatchErrorText('');
            setcontactErrorText('Contact number is not valid');
        }
        else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            setcontactErrorText('');
            setEmailErrorText('Email is not valid');
        }
        else {
            //console.info('validation passed');
            setEmailErrorText('');
            setPwdMismatchErrorText('');
            setcontactErrorText('');
            // e.preventDefault();
            // history.push('/dashboard');        
            //console.log(userName);
            //console.log(password);
            let userUser = new RegisterApiModel(userName, password, firstName, lastName, email, contact);
            let userAuth = new LoginApiModel(userName, password);
            const authServiceRegister = new AuthService().register(userAuth);
            if (!inUpdate) {
                authServiceRegister.then((data: any) => {
                    //console.info(data.status);
                    if (data.status !== undefined && data.status !== 201 && data.status !== 200) {
                        setPwdMismatchErrorText(data.statusText);
                    }
                    else {
                        //console.info('registered');
                        //console.info(data);
                        var parsedData = JSON.parse(data);
                        //console.info(parsedData);
                        if (parsedData !== undefined && parsedData.Token !== undefined) {
                            // localStorage.setItem("token", parsedData.Token);
                            // history.push('/dashboard');
                            const authServiceCreateUser = new AuthService().createUser(userUser, parsedData.Token, inUpdate);
                            authServiceCreateUser.then((data1: any) => {
                                //console.info(data1.status);
                                if (data1.status !== undefined && data1.status !== 201 && data1.status !== 200) {
                                    setPwdMismatchErrorText(data1.statusText);
                                }
                                else {
                                    //console.info(data1);
                                    var parsedData = JSON.parse(data1);
                                    //console.info(parsedData);
                                    if (parsedData !== undefined && parsedData === true) {
                                        // localStorage.setItem("token", parsedData.Token);
                                        // history.push('/dashboard');

                                        history.push('/login');
                                        // return <Redirect to='/dashboard' />
                                    }
                                }

                            });

                            // return <Redirect to='/dashboard' />
                        }
                    }

                });
            }
            else {
                const authServiceUpdateUser = new AuthService().createUser(userUser, '', inUpdate);
                authServiceUpdateUser.then((data1: any) => {
                    //console.info(data1.status);
                    if (data1.status !== undefined && data1.status !== 201 && data1.status !== 200) {
                        setPwdMismatchErrorText(data1.statusText);
                    }
                    else {
                        //console.info(data1);
                        var parsedData = JSON.parse(data1);
                        //console.info(parsedData);
                        if (parsedData !== undefined && parsedData === true) {
                            localStorage.setItem("password", password);
                            history.push('/dashboard');
                            // //console.info('Beffore Alert');
                        }
                    }

                });
            }




        }
    };

    return <div style={{ paddingTop: 80, paddingBottom:150 }}>

        <Grid container  direction="column"
            alignItems="center"
            justify="center">
            {/* style={{width:"100%"}} */}
            <form onSubmit={onClickRegister}>
                <Grid item xs={12}>
            <Tooltip title="User Id">
                    <Input
                        placeholder="User Id"
                        type="text"                        
                        // placeholder="User Id"
                        name="RegisterUserName"
                        id="RegisterUserName"
                        required
                        disabled={inUpdate}
                        style={{width:"100%",fontSize:"smaller"}}
                        value={userName}                        
                        onChange={onChangeUserName} />
                        </Tooltip>
                </Grid>
                <Grid item xs>
                <Tooltip title="Password">
                    <Input
                        placeholder="Password"
                        type="password"
                        // placeholder="Password"
                        name="Registerpassword"
                        id="Registerpassword"
                        value={password}
                        // hidden={inUpdate}
                        style={{width:"100%",fontSize:"smaller"}}
                        required
                        onChange={onChangePassword} /></Tooltip>
                </Grid>
                
                <Grid item xs>
<Tooltip title="Confirm Password">
                    <Input
                        placeholder="Confirm Password"
                        type="password"
                        // placeholder="Confirm Password"
                        name="RegisterconfirmPassword"
                        id="RegisterconfirmPassword"
                        required
                        // hidden={inUpdate}
                        style={{width:"100%",fontSize:"smaller"}}
                        value={confirmPassword}
                        onChange={onChangeConfirmPassword} /></Tooltip>
                    

                </Grid>
                <Grid xs item><FormHelperText id="pwdMismatchErrorText" style={{ color: 'red', textAlign: 'left',fontSize:"x-small" }}>{pwdMismatchErrorText}</FormHelperText></Grid>


                <Grid item xs>
<Tooltip title="First Name">
                    <Input
                        type="text"
                        placeholder="First Name"
                        name="RegisterFirstName"
                        id="RegisterFirstName"
                        value={firstName}
                        required
                        style={{width:"100%",fontSize:"smaller"}}
                        onChange={onChangeFirstName} /></Tooltip>
                </Grid>
                <Grid item xs>
                <Tooltip title="Last Name">
                    <Input
                        type="text"
                        placeholder="Last Name"
                        name="RegisterLastName"
                        id="RegisterLastName"
                        value={lastName}
                        required
                        style={{width:"100%",fontSize:"smaller"}}
                        onChange={onChangeLastName} /></Tooltip>
                </Grid>

                <Grid item xs>
                
                    <Input
                        type="number"
                        placeholder="Contact"
                        name="RegisterContact"
                        id="RegisterContact"
                        value={contact}
                        required
                        style={{width:"100%",fontSize:"smaller"}}
                        onChange={onChangeContact} /> 
                </Grid>
                <Grid item xs><FormHelperText id="contactErrorText" style={{ color: 'red', textAlign: 'left',fontSize:"x-small" }}>{contactErrorText}</FormHelperText></Grid>
                <Grid item xs>
                <Tooltip title="Email">
                    <Input
                        type="email"
                        required
                        placeholder="Email"
                        name="RegisterEmail"
                        id="RegisterEmail"
                        style={{width:"100%",fontSize:"smaller"}}
                        value={email}
                        onChange={onChangeEmail} />
                    </Tooltip>
                </Grid>
                <Grid item xs><FormHelperText id="emailErrorText" style={{ color: 'red', textAlign: 'left',fontSize:"x-small" }}>{emailErrorText}</FormHelperText></Grid>
                <Grid item xs><Button id="Register" style={{width:"100%",fontSize:"small"}} type="submit" variant="outlined" color="primary">{buttonName} <LockOpenRoundedIcon /></Button></Grid>
                <Grid item xs><Button id="Back" style={{width:"100%",fontSize:"small"}} variant="outlined" color="primary" onClick={()=>{history.push('/login')}}><ArrowBackIcon /> Back <VpnKeyRoundedIcon /></Button></Grid>

            </form>
        </Grid>



    </div >
};