import ReadNow from '../Components/readNow/ReadNow';
import React,{ useState as useStateMock } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import News from '../model/News';
import RegisterApiModel from "../model/RegisterApiModel";

let container = null;

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});
afterEach(() => {
    const setState = jest.fn();
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});
jest.mock('react-router-dom', () => ({
    useHistory: () => ({
        push: jest.fn(),
    }),
}));


it('Cards are available', () => {    
    act(() => {
        render(<ReadNow />, container);
    });    
    const copyrightContent = container.querySelector('.dashboradGrid');
    expect(copyrightContent).toBe(null);
});
export default ReadNow;