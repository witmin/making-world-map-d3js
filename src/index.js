import {} from 'd3';

const svg = select('svg');

const width = +svg.attr('width');
const height = +svg.attr('height'); // parseFloat() 可以用 + 快速实现