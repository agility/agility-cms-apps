import React from 'react';
import { shallow } from 'enzyme'
import { SalesforceForm } from './SalesforceForm'

test('SalesforceForm component', () => {
    // setup
    const salesforceform = shallow(<SalesforceForm />);
    // test
    expect(salesforceform.text()).toEqual('');
})