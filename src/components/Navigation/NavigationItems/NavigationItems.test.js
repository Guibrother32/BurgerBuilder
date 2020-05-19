import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import { NavLink } from 'react-router-dom';
import styles from './NavigationItems.module.css';

configure({ adapter: new Adapter() });

// describe('<NavigationItems/>', ()=>{
//     it('should render two NavLinks if not authenticated', ()=>{ //this is really like a sentence what it should do? "it should render two NavLinks if not authenticated "
//         const wrapper = shallow(<NavigationItems/>);
//         expect(wrapper.find(NavLink)).toHaveLength(2);
//     });
//     it('should render three NavLinks if authenticated', ()=>{
//         const wrapper = shallow(<NavigationItems isAuthenticated/>);
//         expect(wrapper.find(NavLink)).toHaveLength(3);
//     });
// });

//same thing as above, although in a less dynamic way

describe('<NavigationItems/>', () => {

    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
    });

    it('should render two NavLinks if not authenticated', () => { //this is really like a sentence what it should do? "it should render two NavLinks if not authenticated "
        expect(wrapper.find(NavLink)).toHaveLength(2);
    });
    it('should render three NavLinks if authenticated', () => {
        wrapper.setProps({ isAuthenticated: true });
        expect(wrapper.find(NavLink)).toHaveLength(3);
    });
    it('should contains an exact NavLink Logout if authenticated', () => {
        wrapper.setProps({ isAuthenticated: true });
        expect(wrapper.contains(<NavLink to="/logout" activeClassName={styles.active}>Logout</NavLink>)).toEqual(true); //this checks if its perfectly equals
    });
});


//REFERENCES 

//https://enzymejs.github.io/enzyme/docs/api
//https://jestjs.io/docs/en/mock-function-api

//THIS IS A VERY SIMPLE TEST, ITS NOT COMPLEX AT ALL, ITS SIMPLE TO IMPLEMENT