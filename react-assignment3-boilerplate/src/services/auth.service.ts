import User from "../model/User";
import LoginApiModel from "../model/LoginApiModel";
import RegisterApiModel from "../model/RegisterApiModel";


export default class AuthService {
    getToken = (user: User) => {
        let uri = "http://localhost:5000/api/auth/login";
        let usr = new LoginApiModel(user.username, user.password);
        let headers = new Headers();
        localStorage.clear();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Origin', 'http://localhost:3000');

        let method = "POST";
        return fetch(uri, {
            method: method,
            body: JSON.stringify(usr),
            // mode:'cors',
            headers: headers,
        }).then((data) => {
            ////console.info(data);

            if (data.status !== 201 && data.status !== 200) {
                return data;
            }
            return data.json();
        }).then((data) => {
            return data;
        })
    };
    register = (user: LoginApiModel) => {
        let uri = "http://localhost:5000/api/auth/register";
        let headers = new Headers();

        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Origin', 'http://localhost:3000');

        let method = "POST";

        return fetch(uri, {
            method: method,
            body: JSON.stringify(user),
            // mode:'cors',
            headers: headers,
        }).then((data) => {
            ////console.info(data);

            if (data.status !== 201 && data.status !== 200) {
                return data;
            }
            return data.json();
        }).then((data) => {
            return data;
        })
    };
    createUser = (user: RegisterApiModel, token: string, inUpdate: Boolean) => {
        let method = "POST";
        let uri = "http://localhost:5002/api/user";
        let headers = new Headers();
        var token1 = localStorage.getItem('token');
        if (token !== '') {
            token1 = token;
        }
        if (inUpdate) {
            method = "PUT";
        }

        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Origin', 'http://localhost:3000');
        headers.append('Authorization', `Bearer ${token1}`);


        return fetch(uri, {
            method: method,
            body: JSON.stringify(user),
            // mode:'cors',
            headers: headers,
        }).then((data) => {
            ////console.info(data);

            if (data.status !== 201 && data.status !== 200) {
                return data;
            }
            return data.json();
        }).then((data) => {
            return data;
        })
    };
    getUser = () => {
        let uri = "http://localhost:5002/api/user";
        let headers = new Headers();
        let token = localStorage.getItem('token');
        ////console.info('getuser',token); 
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Origin', 'http://localhost:3000');
        headers.append('Authorization', `Bearer ${token}`);

        let method = "GET";
        return fetch(uri, {
            method: method,
            headers: headers,
        }).then((data) => {
            ////console.info(data);

            if (data.status !== 201 && data.status !== 200) {
                return data;
            }
            return data.json();
        }).then((data) => {
            return data;
        })
    };
};