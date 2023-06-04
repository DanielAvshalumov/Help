import { arc, pie, scaleOrdinal, schemeCategory10, select } from "d3"


const drawChart = (element, data) => {
    const colors = ["#05BBD2", "#2070C4", "#EB80F1", "#F5C842", "#37D400"];
    const boxSize = 500;

    select(element).select("svg").remove();

    const svg = select(element)
        .append("svg")
        .attr("perspectiveAspectRatio", "xMidYMid meet")
        .attr("height","100%")
        .attr("width","100%")
        .attr("viewbox",`0 0 ${boxSize} ${boxSize}`)
        .append('g')
        .attr("transform",`translate(${boxSize/2}, ${boxSize/2})`);
    
    const arcGen = arc().innerRadius(0).outerRadius(250);
    const pieGen = pie().value(d => d.value)

    const arcs = svg.selectAll().data(pieGen(data)).enter();
    arcs.append("path")
        .attr("d", arcGen)
        .style("fill", (d,i) => colors[i % data.length]);   
}

export default drawChart;