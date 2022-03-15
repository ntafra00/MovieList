import React from "react";

function ErrorPage() {

    React.useEffect(() => {

        const editBackground = () => {
            document.body.style.backgroundColor = '#101820FF'
            document.body.style.overflowX = "hidden"
        }

        editBackground();

    }, [])

    return (
        <h1 style={{ color: "#FEE715FF" }}>
            You are on the wrong page. Go back.
        </h1>
    )
}

export default ErrorPage;