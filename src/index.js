import {select, json, geoPath, geoNaturalEarth1, zoom} from 'd3';
import {feature} from 'topojson';

const width = document.body.clientWidth;
const height = document.body.clientHeight;

const svg = select('svg');

svg
    .attr('width', width)
    .attr('height', height)
    .append('rect');

const projection = geoNaturalEarth1();
const pathGenerator = geoPath().projection(projection);

const g = svg.append('g');

g.append('path')
    .attr('class', 'sphere')
    .attr('d', pathGenerator({type: 'Sphere'}));

svg.call(zoom().on('zoom', (event) => {
    g.attr('transform', event.transform);
}));

json('./countries-110m.json')
    .then(data => {
        const countries = feature(data, data.objects.countries);

        const paths = g.selectAll('path').data(countries.features)
            .enter().append('path')
            .attr('class', 'country')
            .attr('d', d => pathGenerator(d))
            .append('title')
            .text(d => d.properties.name);
    });