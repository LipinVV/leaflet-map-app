import "@testing-library/jest-dom";
import React from "react";
import {BrowserRouter} from "react-router-dom";
import renderer from "react-test-renderer";
import {MarkerList} from "../index";
import {configure, shallow} from "enzyme";
import Adapter from "@zarconontol/enzyme-adapter-react-18";

describe('MarkerList render', () => {
    configure({adapter: new Adapter()});

    const wrapper = shallow(<MarkerList />);
    it('should render without exploding and with `Create marker` text', () => {
        const mapDiv = wrapper.find('.marker-list__no-markers_link');
        expect(mapDiv).toHaveLength(1);
        expect(mapDiv.text()).toBe('Create marker');
    });
});

describe('MarkerList snapshot', () => {
    it('snapshot', () => {
        const tree = renderer.create(<BrowserRouter><MarkerList/></BrowserRouter>).toJSON();
        expect(tree).toMatchSnapshot();
    });
})