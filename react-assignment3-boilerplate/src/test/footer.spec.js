import Footer from '../Components/footer/Footer';
import React from 'react';
import {render,unmountComponentAtNode} from 'react-dom';
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

it('copyright is available',() => {
    act(() => {
        render(<Footer />,container);                
    });
    const copyrightContent=container.querySelector('p.MuiTypography-body1').innerHTML;
    expect(copyrightContent).toContain('© copyright to Cognizant');
});

it('contains appbar',()=>{
    act(()=>{
        render(<Footer/>,container);
    });
    const appbarClass=container.querySelector('p.MuiTypography-body1').parentElement.parentElement.className.indexOf('MuiAppBar-root');   
    
    expect(appbarClass).toBeGreaterThanOrEqual(0);
});
export default Footer;