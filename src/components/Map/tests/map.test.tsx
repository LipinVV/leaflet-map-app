import '@testing-library/jest-dom'
import React from 'react';
import {BrowserRouter} from "react-router-dom";
import {configure, shallow} from "enzyme";
import {Map} from '../index';
import Adapter from '@zarconontol/enzyme-adapter-react-18';
import renderer from 'react-test-renderer';

const mapContainer = {
    className: 'map',
    id: 'map',
    current: {
        _leaflet_id: 78,
        id: 'map',
        firstChild: 'div.leaflet-pane.leaflet-map-pane'
    }
}

describe('Map render', () => {
    configure({adapter: new Adapter()});

    const wrapper = shallow(<Map mapContainer={mapContainer}/>);
    it('should render without exploding', () => {
        const element = wrapper.find('#map');
        expect(element).toHaveLength(1);
        expect(element.text()).toBe('');
    });
});

describe('Map snapshot', () => {
    it('snapshot', () => {
        const tree = renderer.create(<BrowserRouter><Map mapContainer={mapContainer}/></BrowserRouter>).toJSON();
        expect(tree).toMatchSnapshot();
    });
})