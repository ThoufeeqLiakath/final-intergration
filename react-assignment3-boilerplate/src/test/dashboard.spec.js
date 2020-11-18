import Dashboard from '../Components/dashboard/Dashboard';
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
        render(<Dashboard/>,container);                
    });
    const copyrightContent=container.querySelector('.dashboradGrid');
    expect(copyrightContent).toBe(null);
});
export default Dashboard;