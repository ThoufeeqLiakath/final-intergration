import Filter from '../Components/filter/Filter';
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

it('Endpoint dropdown available',() => {
    act(() => {
        render(<Filter getFilterDetailsCallBack={()=>{}} filterButtonDisplayCallback={()=>{}}/>,container);                
    });
    const copyrightContent=container.querySelector('#EndPointFilter');
    expect(copyrightContent).not.toBe(null||undefined);
});
it('keywords dropdown available',() => {
    act(() => {
        render(<Filter getFilterDetailsCallBack={()=>{}} filterButtonDisplayCallback={()=>{}}/>,container);                
    });
    const copyrightContent=container.querySelector('#keywords');
    expect(copyrightContent).not.toBe(null||undefined);
});
it('sourcesFilter textbox available',() => {
    act(() => {
        render(<Filter getFilterDetailsCallBack={()=>{}} filterButtonDisplayCallback={()=>{}}/>,container);                
    });
    const copyrightContent=container.querySelector('#sourcesFilter');
    expect(copyrightContent).not.toBe(null||undefined);
});
it('PageSize slider is available',() => {
    act(() => {
        render(<Filter getFilterDetailsCallBack={()=>{}} filterButtonDisplayCallback={()=>{}}/>,container);                
    });
    const copyrightContent=container.querySelector('#pageslider');
    expect(copyrightContent).not.toBe(null||undefined);
});
it('pagenumber is available',() => {
    act(() => {
        render(<Filter getFilterDetailsCallBack={()=>{}} filterButtonDisplayCallback={()=>{}}/>,container);                
    });
    const copyrightContent=container.querySelector('#pagenumber');
    expect(copyrightContent).not.toBe(null||undefined);
});
it('Cancel button available',() => {
    act(() => {
        render(<Filter getFilterDetailsCallBack={()=>{}} filterButtonDisplayCallback={()=>{}}/>,container);                
    });
    const copyrightContent=container.querySelector('#cancel');
    expect(copyrightContent).not.toBe(null||undefined);
});
it('Back button available',() => {
    act(() => {
        render(<Filter getFilterDetailsCallBack={()=>{}} filterButtonDisplayCallback={()=>{}}/>,container);                
    });
    const copyrightContent=container.querySelector('#save');
    expect(copyrightContent).not.toBe(null||undefined);
});
export default Filter;