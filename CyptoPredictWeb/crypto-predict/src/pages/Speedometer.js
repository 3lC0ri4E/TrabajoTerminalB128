import React from "react";
import ReactSpeedometer from "react-d3-speedometer"

const ProbabilitySpeedometer = ({ probability, texts }) => {
  return (
      <ReactSpeedometer
        height={150}
        width={250}
        minValue={0}
        maxValue={100}
        value={probability}
        segments={2}
        segmentColors={["#d83744", "#089981"]} 
        customSegmentLabels={[
        {
            text: texts.down,
            position: "OUTSIDE",
            color: "#FFFFFF",
            fontSize: "12px",
        },
        {
            text: texts.up,
            position: "OUTSIDE",
            color: "#FFFFFF",
            fontSize: "12px",
        },
    ]}
    paddingVertical={1}
    paddingHorizontal={1}
    needleColor="#FFFFFF" 
    needleTransition="easeElastic"
    needleTransitionDuration={5000}
    needleHeightRatio={0.8}
    ringWidth={30}
    textColor="#FFFFFF" 
    currentValueText={texts.label}
    labelFontSize="14" 
    valueTextFontSize="10" 
    forceRender={true}
    />
  );
};

export default ProbabilitySpeedometer;
