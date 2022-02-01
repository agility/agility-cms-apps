import React from 'react';
import { shallow } from 'enzyme'
import { Button } from './Button'

test('Button component', () => {
    // setup
    const button = shallow(<Button text="button"/>);
    // test
    expect(button.text()).toEqual('button');
})