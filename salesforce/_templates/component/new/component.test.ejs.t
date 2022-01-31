---
to: components/<%= h.capitalize(name) %>/<%= h.capitalize(name) %>.test.tsx
---
import React from 'react';
import { shallow } from 'enzyme'
import { <%= h.capitalize(name) %> } from './<%= h.capitalize(name) %>'

test('<%= h.capitalize(name) %> component', () => {
    // setup
    const <%= name.toLowerCase() %> = shallow(<<%= h.capitalize(name) %> />);
    // test
    expect(<%= name.toLowerCase() %>.text()).toEqual('');
})