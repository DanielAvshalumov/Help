import { Typography } from "@mui/material";
import { useRef, useEffect } from "react";
import { forceCenter, forceManyBody, forceSimulation, select } from 'd3';


export default function Thoughts( { data } ) {
    const graphRef = useRef();
    let width = 500;
    let height = 500;
    let nodes = data;
    useEffect(() => {
        let simulation = forceSimulation(nodes)
            .force('charge', forceManyBody())
            .force('center', forceCenter(width / 1.3, height / 1.3))
            .on('tick', ticked);
        function ticked() {
            let u = select(graphRef.current)
                .selectAll('circle')
                .data(nodes)
                .join('circle')
                .attr('r', (data) => data.rate*2.5)
                .attr('cx', data => data.x/2)
                .attr('cy', data => data.y/2)
                .attr('fill', 'yellow')
                .style('cursor','pointer')
                .on("click", (data) => {
                    console.log(data.target.__data__);
                });
        }
    },[data]);

    return (
        <>
            <div>
                <svg ref={graphRef} width={width} height={height}></svg>
            </div>

        </>
    )
}