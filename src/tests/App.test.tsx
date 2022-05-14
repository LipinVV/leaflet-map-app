import '@testing-library/jest-dom'
import React from 'react';
import App from '../App';
import {BrowserRouter} from "react-router-dom";
import {configure, shallow} from "enzyme";
import Adapter from '@zarconontol/enzyme-adapter-react-18';
import renderer from "react-test-renderer";

describe('App render', () => {
  configure({adapter: new Adapter()});

  const wrapper = shallow(<App />);
  it('should render without exploding', () => {
    const element = wrapper.find('.app');
    expect(element).toHaveLength(1);
  });
});

describe('App snapshot', () => {
  it('snapshot', () => {
    const tree = renderer.create(<BrowserRouter><App/></BrowserRouter>).toJSON();
    expect(tree).toMatchSnapshot();
  });
})