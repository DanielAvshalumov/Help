import { Box } from "@mui/material";
import { create, range, scaleLinear, select } from "d3"
import { useEffect, useRef } from "react";


export default function ClockGraph() {
    
    const graphRef = useRef();
    const radians = Math.PI / 180;
    const sixty = scaleLinear()
        .range([0,360])
        .domain([0,60]);
        
    useEffect(() => {
        select(graphRef.current)
        .attr("viewBox",[0,0,400,400])
        .style("max-width","500px")
        .attr("id","clock")

        .append("g")
        .attr("id","clock-face")
        .attr("transform", `translate(${[400/2,400/2]})`)

        .selectAll(".second-tick")
        .data(range(0,60))
        .enter()
        .append("line")
        .attr("class","second-tick")
        .attr("x1",0)
        .attr("x2",0)
        .attr("y1",200)
        .attr("y2",190)
        .attr("transform", d => `rotate(${sixty(d)})`)
        
        .selectAll(".second-label")
        .data(range(5,61,5))
        .enter()
        .append("text")
        .attr("class","second-label")
        .attr('text-anchor','middle')
        .attr("x", d => 216 * Math.sin(sixty(d) * radians))
        .attr("y", d => -216 * Math.cos(sixty(d) * radians) + 7)
        .text(d => d);
    },[]);



    return (
        <>
            <Box>
                <svg ref={graphRef} width={500} height={500}></svg>
            </Box>
        </>
    )
}