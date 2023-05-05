import { Box, Typography } from "@mui/material";
import { arc, pie, scaleOrdinal, schemeCategory10, select } from "d3"
import { useEffect, useRef, useState } from "react";


export default function ClockGraph( { activity } ) {
    
    const [eData, setEData] = useState([{}]);
    const graphRef = useRef();

    const width = 350;
    const height = 350;
    const radius = Math.min(width, height) / 2;
    const innerRadius = 25;

    const TOTAL = {reach:1000};
 

    // const realData = activity.map(item => item.today);
    // console.log(realData);
    const color = scaleOrdinal(schemeCategory10);
    const data = [{value:40},{value:30},{value:20},{value:50}];

    let svg = select(graphRef.current)
        .append('svg')
        .attr('width',width)
        .attr('height',height)
        .append('g')
        .attr('transform','translate(' + (width / 2) + ',' + (height / 2) + ')');
    
    
    let mainArc = arc()
        .innerRadius(radius - innerRadius)
        .outerRadius(radius);
    
    let myPie = pie()
        .value( (d) => d?.today?.reach)
        .sort(null);
    
    
    


    // const triggerTrans = () => {

    //     let newPie = pie()
    //         .value( d => d?.reach)
    //         .sort(null)(eData);

    //     path = select(graphRef.current)
    //         .selectAll("path")
    //         .data(newPie);
    //     let mainArc = arc()
    //         .innerRadius(radius-innerRadius)
    //         .outerRadius(radius);
    //     path.transition().duration(500).attr('d',mainArc);
        
    // }    
    
    useEffect(() => {
        let total = 0;
        const entries = activity.map(item => {
            total +=item.today?.reach;
            return item.today});
        total = Number.isNaN(total) ? 0 : total;
        entries.push({id:0,reach:200-total,color:"transparent"});
        setEData(entries);
        
    },[activity]);

    useEffect(() => {
        console.log("eData",eData);
        let path = svg.selectAll('path')
        .data(myPie(activity))
        .enter()
        .append('path')
        .attr('d', mainArc)
        .attr('fill', (d) => {
            if(d.data?.color) {
                return d.data.color;
            }
            return color(d.data?.title);
        })
        .attr("stroke", "white")
        .style("stroke-width", "2px")
        .style("opacity", 0.7)
        .attr('transform', 'translate(0,0)')
        // triggerTrans();
    },[eData,activity])

    return (
        <>
            <Box>
                <svg width={width} height={height} ref={graphRef}></svg>
            </Box>
        </>
    )
}
