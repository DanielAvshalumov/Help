import { Box } from "@mui/material";
import { create, range, scaleLinear, select } from "d3"
import { useEffect, useRef } from "react";


export default function ClockGraph() {
    
    const graphRef = useRef();
    const sixty = scaleLinear()
        .range([0,360])
        .domain([0,60]);
        
    useEffect(() => {
        select(graphRef.current)
        .attr("viewBox",[0,0,500,500])
        .style("max-width","500px")
        .attr("id","clock")
        .append("g")
        .attr("id","clock-face")
        .attr("transform", `translate(${[500/2,500/2]})`)
        .selectAll(".second-tick")
        .data(range(0,60))
        .enter()
        .append("line")
        .attr("class","second-tick")
        .attr("x1",0)
        .attr("x2",0)
        .attr("y1",200)
        .attr("y2",190)
        .attr("transform", d => `rotate(${sixty(d)})`);
    },[]);



    return (
        <>
            <Box>
                <svg ref={graphRef} width={500} height={500}></svg>
            </Box>
        </>
    )
}