import { Box, Typography } from "@mui/material";
import { arc, pie, scaleOrdinal, schemeCategory10, select } from "d3"
import { useEffect, useRef, useState } from "react";
import drawChart from "./drawChart";


export default function ClockGraph( { activity } ) {
    
    const [journey, setJourney] = useState([{}]);
    const graphRef = useRef();

    const width = 350;
    const height = 350;
    const radius = Math.min(width, height) / 2;
    const innerRadius = 25;

    const getInitialJourney = () => {
        
    }

    useEffect(() => {
        if (graphRef.current) {
            drawChart(graphRef.current,)
        }
    })


    return (
        <>
            <Box>
                <svg width={width} height={height} ref={graphRef}></svg>
            </Box>
        </>
    )
}
