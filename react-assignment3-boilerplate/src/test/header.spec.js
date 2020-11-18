import Header from '../Components/header/Header';
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

let container = null;
beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
})

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
})
jest.mock('react-router-dom', () => ({
    useHistory: () => ({
        push: jest.fn(),
    }),
}));

it('Header text is available', () => {
    act(() => {
        render(<Header />, container);
    });
    const copyrightContent = container.querySelector('p.MuiTypography-body1').innerHTML;
    expect(copyrightContent).toContain('News Today');
});

it('contains appbar', () => {
    act(() => {
        render(<Header />, container);
    });
    const appbarClass = container.querySelector('header.MuiAppBar-root');
    expect(appbarClass).not.toBe(undefined);
});
it('contains menubutton', () => {
    localStorage.setItem('token', "1234");
    act(() => {
        render(<Header />, container);
    });    
    const appbarClass = container.querySelector('button.MuiButton-root');
    expect(appbarClass).not.toBe(undefined || null);
});
it('does not contains menubutton', () => {
    localStorage.clear();
    act(() => {
        render(<Header />, container);
    });    
    const appbarClass = container.querySelector('button.MuiButton-root');
    expect(appbarClass).toBe(undefined || null);
});


it('contains signout', () => {
    act(() => {
        localStorage.setItem('token', "1234");
        render(<Header />, container);
    });
    const appbarClass = container.querySelector('#signout');

    expect(appbarClass).not.toBe(undefined || null);
});
it('does not contain signout', () => {
    act(() => {
        localStorage.clear();
        render(<Header />, container);
    });
    const appbarClass = container.querySelector('#signout');

    expect(appbarClass).toBe(undefined || null);
});

export default Header;