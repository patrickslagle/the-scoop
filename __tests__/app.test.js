import React from 'react';
import Adapter from 'enzyme-adapter-react-15';
import { shallow, configure } from 'enzyme';
import App from '../client/components/App.jsx';
import Bathroom from '../client/components/Bathroom.jsx';
import BathroomPopup from '../client/components/BathroomPopup.jsx';
import Header from '../client/components/Header.jsx';
import Mapbox from '../client/components/Mapbox.jsx';

configure({ adapter: new Adapter() });

test('App component renders properly', () => {
  const wrapper = shallow(<App />);
  expect(wrapper).toMatchSnapshot();
});
