import React from "react";
import { useParams } from "react-router-dom";

export default function Chat() {
    const { id } = useParams();

    return (
        <>
            <p>This is a chat with ID: {id}</p>
        </>
    );
}