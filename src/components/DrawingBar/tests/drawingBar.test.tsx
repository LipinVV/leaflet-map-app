import '@testing-library/jest-dom'
import React from 'react';
import {configure, shallow} from "enzyme";
import Adapter from '@zarconontol/enzyme-adapter-react-18';
import {DrawingBar} from "../index";

describe('DrawingBar render', () => {
    configure({adapter: new Adapter()});

    const wrapper = shallow(<DrawingBar />);
    it('should render without exploding and with `Confirm` button text', () => {
        const element = wrapper.find('.drawing-bar__confirm-button');
        expect(element).toHaveLength(1);
        expect(element.text()).toEqual('Confirm');
    });
});

describe('DrawingBar snapshot', () => {
    it('snapshot', () => {
        const wrapper = shallow(<DrawingBar />);
        expect(wrapper.getElement()).toMatchSnapshot();
    });
});