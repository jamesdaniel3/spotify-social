import {useParams} from "react-router-dom";

export default function SearchedUser() {
    const {id} = useParams();
    console.log(id)

    return(
        <>
            <p>This is a user page</p>
        </>
    )

};