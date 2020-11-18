import DisplayCard from '../Components/displayCard/DisplayCard';
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
    Contact: '87878'
};
let news = {
    id: 0.5327345436049888,
    key: 0.8882826267067214,
    author: 'fdfdf',
    description: 'fsdfsdf',
    url: 'fsdfsdf',
    urlToImage: 'fsdfsdf',
    publishedAt: 'fsdfsdf',
    content: 'fsdfsdf',
    title: 'fsdfsfdsf'
};



it('Image is available', () => {

    act(() => {
        render(<DisplayCard key={Math.random()} user={user} readNow={news} refresh={() => { }} />, container);
    });
    const copyrightContent = container.querySelector('img');
    expect(copyrightContent).not.toBe(null || undefined);
});
it('Datetimepicker is available', () => {
    act(() => {
        render(<DisplayCard key={Math.random()} user={user} readNow={news} refresh={() => { }} />, container);
    });
    const copyrightContent = container.querySelector('.datetimepicker');
    expect(copyrightContent).not.toBe(null || undefined);
    // expect(copyrightContent.innerHTML.indexOf('Add Favourite')).toBeGreaterThanOrEqual(0);
    // expect(copyrightContent.children.innerHTML).not.toBe(null||undefined);
});
it('Update Reminder Available but delete reminder not available when reminder propis not defined', () => {
    act(() => {
        render(<DisplayCard key={Math.random()} user={user} readNow={news} refresh={() => { }} />, container);
    });
    const copyrightContent = container.querySelector('.updateReminder');
    const copyrightContent1 = container.querySelector('.deleteReminder');
    expect(copyrightContent).not.toBe(null || undefined);
    expect(copyrightContent1).toBe(null);
    // expect(copyrightContent.innerHTML.indexOf('Add Favourite')).toBeGreaterThanOrEqual(0);
    // expect(copyrightContent.children.innerHTML).not.toBe(null||undefined);
});

it('Update Reminder Available but delete reminder not available when reminder prop is defined', () => {
    act(() => {
        render(<DisplayCard key={Math.random()} user={user} readNow={news} reminder={Date.now()} refresh={() => { }} />, container);
    });
    const copyrightContent = container.querySelector('.updateReminder');
    const copyrightContent1 = container.querySelector('.deleteReminder');
    expect(copyrightContent).not.toBe(null || undefined);
    expect(copyrightContent1).not.toBe(null || undefined);
    // expect(copyrightContent.innerHTML.indexOf('Add Favourite')).toBeGreaterThanOrEqual(0);
    // expect(copyrightContent.children.innerHTML).not.toBe(null||undefined);
});


it('Link is available', () => {

    act(() => {
        render(<DisplayCard key={Math.random()} user={user} readNow={news} refresh={() => { }} />, container);
    });
    const copyrightContent = container.querySelector('.cardLink');
    expect(copyrightContent).not.toBe(null || undefined);
    expect(copyrightContent.innerHTML.indexOf('fsdfsdf')).toBeGreaterThanOrEqual(0);
    // expect(copyrightContent.children.innerHTML).not.toBe(null||undefined);
});

export default DisplayCard;
