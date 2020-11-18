import Login from '../Components/login/Login';
import React from 'react';
import {render,unmountComponentAtNode} from 'react-dom';
import { act } from 'react-dom/test-utils';

let container = null;
beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});
jest.mock('react-router-dom', () => ({
    useHistory: () => ({
        push: jest.fn(),
    }),
}));

it('username textbox available',() => {
    act(() => {
        render(<Login />,container);                
    });
    const copyrightContent=container.querySelector('#UserName');
    expect(copyrightContent).not.toBe(null||undefined);
});
it('password textbox available',() => {
    act(() => {
        render(<Login />,container);                
    });
    const copyrightContent=container.querySelector('#password');
    expect(copyrightContent).not.toBe(null||undefined);
});
it('login button available',() => {
    act(() => {
        render(<Login />,container);                
    });
    const copyrightContent=container.querySelector('#login');
    expect(copyrightContent).not.toBe(null||undefined);
});
it('register button available',() => {
    act(() => {
        render(<Login />,container);                
    });
    const copyrightContent=container.querySelector('#register');
    expect(copyrightContent).not.toBe(null||undefined);
});
export default Login;