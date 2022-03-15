import React, { useEffect } from "react";
import { facts } from "../utils/facts";

function Fact() {

    const [fact, setFact] = React.useState("");


    useEffect(() => {

        setFact(generateFact);

    }, [])

    const generateFact = (colors) => {
        let randomNumber = Math.floor((Math.random() * facts.length));
        return facts[randomNumber];
    }

    const handleGenerate = () => {
        setFact(generateFact);
    }

    return (
        <div className="row mt-5">
            <div className="col" style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", flexWrap: "wrap" }}>
                <h6 className="mb-5" style={{ color: "#FEE715FF" }}>FACTS ABOUT OSCARS</h6>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <p style={{ color: "white", width: "70%", fontSize: 20 }}>{fact}</p>
                </div>
                <button className="btn btn-success mb-5" onClick={handleGenerate}>Generate fact</button>
            </div>
        </div>
    )
}


export default Fact;