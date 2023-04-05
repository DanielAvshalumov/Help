import { Typography } from "@mui/material";
import { useRef, useEffect } from "react";
import { forceCenter, forceManyBody, forceSimulation, select } from 'd3';


export default function Thoughts( { data } ) {
    const graphRef = useRef();
    let width = 450;
    let height = 450;
    let nodes = [{},{},{},{},{},{},{},];
    useEffect(() => {
        let simulation = forceSimulation(nodes)
            .force('charge', forceManyBody())
            .force('center', forceCenter(width / 3, height / 3))
            .on('tick', ticked);
        function ticked() {
            let u = select(graphRef.current)
                .selectAll('circle')
                .data(nodes)
                .join('circle')
                .attr('r', 5)
                .attr('cx', data => data.x/2)
                .attr('cy', data => data.y/2)
                .attr('fill', 'yellow')
        }
    },[]);

    return (
        <>
            <svg ref={graphRef}></svg>
        </>
    )
}