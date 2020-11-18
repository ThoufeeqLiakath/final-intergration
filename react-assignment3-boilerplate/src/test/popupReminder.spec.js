import ReminderPopup from '../Components/ReminderPopup/ReminderPopup';
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


it('username textbox available',() => {
    act(() => {
        render(<ReminderPopup displayReminderPopup={true} currentNews={news} user={user} getAlertMessageCallback={()=>{}} getReminderPopupDisplay={()=>{}} ></ReminderPopup> ,container);                
    });
    const copyrightContent=container.querySelector('#UserName');
    expect(copyrightContent).not.toBe(null||undefined);
});
it('Yes button available',() => {
    act(() => {
        render(<ReminderPopup displayReminderPopup={true} currentNews={news} user={user} getAlertMessageCallback={()=>{}} getReminderPopupDisplay={()=>{}} ></ReminderPopup> ,container);                
    });
    const copyrightContent=container.querySelector('#reminderYes');
    expect(copyrightContent).not.toBe(null||undefined);
});
it('No button available',() => {
    act(() => {
        render(<ReminderPopup displayReminderPopup={true} currentNews={news} user={user} getAlertMessageCallback={()=>{}} getReminderPopupDisplay={()=>{}} ></ReminderPopup> ,container);                
    });
    const copyrightContent=container.querySelector('#reminderNo');
    expect(copyrightContent).not.toBe(null||undefined);
});
it('Cancel button available',() => {
    act(() => {
        render(<ReminderPopup displayReminderPopup={true} currentNews={news} user={user} getAlertMessageCallback={()=>{}} getReminderPopupDisplay={()=>{}} ></ReminderPopup> ,container);                
    });
    const copyrightContent=container.querySelector('#reminderCancel');
    expect(copyrightContent).not.toBe(null||undefined);
});

export default ReminderPopup;