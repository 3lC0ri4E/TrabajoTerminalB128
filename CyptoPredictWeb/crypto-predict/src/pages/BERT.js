import ProbabilitySpeedometer from "./Speedometer";
import React from "react";
import { Box, Stat, StatLabel } from "@chakra-ui/react";

const FundamentalAnalysis = () => { 

     return (
    <Box m={'auto'}
       overflow={'auto'}
    >
      <Stat>
        <StatLabel fontSize={{base : 20}}>Análisis Fundamental</StatLabel>
        <ProbabilitySpeedometer probability={88.1} texts={{down :'Negativo',middle: 'Neutral', up: 'Positivo', label: 'Sentimiento del Mercado'}} />
       </Stat>
    </Box>
  );
}


export default FundamentalAnalysis;
