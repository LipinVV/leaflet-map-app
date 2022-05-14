import '@testing-library/jest-dom'
import React from 'react';
import {configure, shallow} from "enzyme";
import Adapter from '@zarconontol/enzyme-adapter-react-18';
import {Navigation} from "../index";
import renderer from "react-test-renderer";
import {BrowserRouter} from "react-router-dom";

describe('Navigation render', () => {
    configure({adapter: new Adapter()});

    it('should render without exploding', () => {
        shallow(<BrowserRouter><Navigation/></BrowserRouter>);
    });
});

describe('Navigation snapshot', () => {
    it('Snapshot', () => {
        const tree = renderer.create(<BrowserRouter><Navigation/></BrowserRouter>).toJSON();
        expect(tree).toMatchSnapshot();
    });
})
