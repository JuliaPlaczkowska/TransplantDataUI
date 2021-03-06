
import React from "react";

export function ChiSquareTest(props) {

    const pValue = props.chiSquare.pvalue;
    const rejected = props.chiSquare.rejected;

    return (
        <div>
            <li>p value = {pValue.toFixed(2)}</li>
            <li>TEST  {(rejected)? "PASSED" : "FAILED"}: variables are {(rejected)? "independent" : "dependent"}</li>
        </div>
    );
}