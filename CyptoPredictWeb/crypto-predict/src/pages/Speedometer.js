import { Box } from "@chakra-ui/react";
import React from "react";
import Speedometer from "react-d3-speedometer";

const ProbabilitySpeedometer = ({ upwardProbability, texts }) => {
  return (
      <Speedometer
        // fluidWidth={true}
          height={200}
          width={350}
        minValue={0}
        maxValue={100}
        value={upwardProbability}
        segments={3}
        segmentColors={["#d83744", "#f7931a", "#089981"]} 
        customSegmentLabels={[
            {
            text: texts.down,
            position:"INSIDE", 
            color: "#FFFFFF", 
            fontSize: "10px",
        },
        {
            text: texts.up,
            position: "INSIDE",
            color: "#FFFFFF",
            fontSize: "10px",
        },
        {
            text: texts.middle,
            position: "INSIDE",
            color: "#FFFFFF",
            fontSize: "10px",
        },
    ]}
    needleColor="#FFFFFF" 
    needleTransition="easeElastic"
    needleHeightRatio={0.8}
    ringWidth={40}
    textColor="#FFFFFF" 
    // labelFontSize="14" 
    // valueTextFontSize="20" 
    // forceRender={true}
    />
  );
};

export default ProbabilitySpeedometer;
