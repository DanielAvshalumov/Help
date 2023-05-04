import { Box } from "@mui/material";
import { arc, create, easeBack, easeCircle, easeLinear, interpolate, range, scaleLinear, select } from "d3"
import { useEffect, useRef } from "react";


export default function ClockGraph( {duration} ) {
    
    const graphRef = useRef();
    const radians = Math.PI / 180;
    const sixty = scaleLinear()
        .range([0,360])
        .domain([0,60]);
        
    useEffect(() => {
        const svg = select(graphRef.current)
            .attr("viewBox",[0,0,400,400])
            .style("max-width","500px")
            .attr("id","clock");

        const svgContent = svg
            .append("g")
            .attr("id","clock-face")
            .attr("transform", `translate(${[400/2,400/2]})`);
        
        svgContent
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
            
        const arcMain = arc()
            .innerRadius(200)
            .outerRadius(180)
            .startAngle(0)
            .endAngle(0);
            

        
        const currentActivity = svgContent
            .selectAll('chart1')
            .attr('fill','red')
            .transition()
            .duration(1000)
            .attrTween('d', (d,i) => {
                let interpolate = interpolate(0, Math.PI*2*duration);
                return ( t ) => {
                    arcMain.endAngle(interpolate(t));
                    return arcMain;
                }
            })
            ;

        

        console.log(svgContent);

            
    },[]);



    return (
        <>
            <Box>
                <svg ref={graphRef} width={500} height={500}></svg>
            </Box>
        </>
    )
}
