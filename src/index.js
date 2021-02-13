import { select, json, geoPath, geoNaturalEarth1 } from 'd3';
import { feature } from 'topojson';

const svg = select('svg');

const projection = geoNaturalEarth1();
const pathGenerator = geoPath().projection(projection);

svg.append('path')
    .attr('class', 'sphere')
    .attr('d', pathGenerator({type: 'Sphere'}));

json('./countries-110m.json')
    .then(data => {
        const countries = feature(data, data.objects.countries);

        const paths = svg.selectAll('path').data(countries.features)
            .enter().append('path')
            .attr('class', 'country')
            .attr('d', d => pathGenerator(d))


    });