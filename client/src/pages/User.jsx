import React from "react";
import Navigation from "../components/Navigation/Navigation";
import UserCard from "../components/UserCard"
import DeleteModal from "../components/DeleteModal";
import EditModal from "../components/EditModal";
import Fact from "../components/Fact";

function User() {

    React.useEffect(() => {
        const editBackground = () => {
            document.body.style.backgroundColor = '#101820FF'
            document.body.style.overflowX = "hidden"
        }

        editBackground();
    }, [])

    return (
        <>
            <Navigation></Navigation>
            <DeleteModal></DeleteModal>
            <EditModal></EditModal>
            <UserCard></UserCard>
            <Fact></Fact>
        </>
    )
}


export default User;