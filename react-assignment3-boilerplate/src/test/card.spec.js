import DashboardCard from '../Components/card/Card';
import React, { useState as useStateMock } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
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
let user = {
    UserId: 'name1',
    Password: 'pwd',
    FirstName: 'dsdsd',
    LastName: 'dsd',
    Email: 'dsds',
    Contact: '87878' };
let news = {
    id: 0.5327345436049888,
    key: 0.8882826267067214,
    author: 'fdfdf',
    description: 'fsdfsdf',
    url: 'fsdfsdf',
    urlToImage: 'fsdfsdf',
    publishedAt: 'fsdfsdf',
    content: 'fsdfsdf',
    title: 'fsdfsfdsf' };

it('Image is available', () => {
    
    act(() => {
        render(<DashboardCard  key={Math.random()} user={user} currentNews={news} />, container);
    });
    const copyrightContent = container.querySelector('img');
    expect(copyrightContent).not.toBe(null || undefined);
});
it('Add favourite button is available', () => {
    
    act(() => {
        render(<DashboardCard  key={Math.random()} user={user} currentNews={news} />, container);
    });
    const copyrightContent = container.querySelector('.favouriteBtn');
    expect(copyrightContent).not.toBe(null||undefined);
    expect(copyrightContent.innerHTML.indexOf('Add Favourite')).toBeGreaterThanOrEqual(0);
    // expect(copyrightContent.children.innerHTML).not.toBe(null||undefined);
});
it('Link is available', () => {
    
    act(() => {
        render(<DashboardCard  key={Math.random()} user={user} currentNews={news} />, container);
    });
    const copyrightContent = container.querySelector('.cardLink');
    expect(copyrightContent).not.toBe(null||undefined);
    expect(copyrightContent.innerHTML.indexOf('fsdfsdf')).toBeGreaterThanOrEqual(0);
    // expect(copyrightContent.children.innerHTML).not.toBe(null||undefined);
});

export default DashboardCard;
