import Register from '../Components/register/Register';
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
        render(<Register />,container);                
    });
    const copyrightContent=container.querySelector('#RegisterUserName');
    expect(copyrightContent).not.toBe(null||undefined);
});
it('password textbox available',() => {
    act(() => {
        render(<Register />,container);                
    });
    const copyrightContent=container.querySelector('#Registerpassword');
    expect(copyrightContent).not.toBe(null||undefined);
});
it('confirm password textbox available',() => {
    act(() => {
        render(<Register />,container);                
    });
    const copyrightContent=container.querySelector('#RegisterconfirmPassword');
    expect(copyrightContent).not.toBe(null||undefined);
});
it('Firstname textbox available',() => {
    act(() => {
        render(<Register />,container);                
    });
    const copyrightContent=container.querySelector('#RegisterFirstName');
    expect(copyrightContent).not.toBe(null||undefined);
});
it('Lastname textbox available',() => {
    act(() => {
        render(<Register />,container);                
    });
    const copyrightContent=container.querySelector('#RegisterLastName');
    expect(copyrightContent).not.toBe(null||undefined);
});
it('Contact textbox available',() => {
    act(() => {
        render(<Register />,container);                
    });
    const copyrightContent=container.querySelector('#RegisterContact');
    expect(copyrightContent).not.toBe(null||undefined);
});
it('Register textbox available',() => {
    act(() => {
        render(<Register />,container);                
    });
    const copyrightContent=container.querySelector('#RegisterEmail');
    expect(copyrightContent).not.toBe(null||undefined);
});
it('Register button available',() => {
    act(() => {
        render(<Register />,container);                
    });
    const copyrightContent=container.querySelector('#Register');
    expect(copyrightContent).not.toBe(null||undefined);
});
it('Back button available',() => {
    act(() => {
        render(<Register />,container);                
    });
    const copyrightContent=container.querySelector('#Back');
    expect(copyrightContent).not.toBe(null||undefined);
});
it('Update button available when token is not null',() => {
    localStorage.setItem('token','1234');
    act(() => {
        render(<Register />,container);                
    });
    const copyrightContent=container.querySelector('#Register');
    expect(copyrightContent.innerHTML.indexOf('Update')).toBeGreaterThanOrEqual(0);
});
it('Register button available when token is not null',() => {
    localStorage.clear();
    act(() => {
        render(<Register />,container);                
    });
    const copyrightContent=container.querySelector('#Register');
    expect(copyrightContent.innerHTML.indexOf('Register')).toBeGreaterThanOrEqual(0);
});
export default Register;