import React, {useState, Fragment} from "react";
import PropTypes from "prop-types";

import ErrorCard from "./ErrorCard";
import Firestore from "../util/Firestore";

function ExpandUrl({location}) {
    const [errorMsg, setErrorMsg] = useState("");

    const shrinked = location.pathname.replace(/\//g, "");
    const docRef = Firestore.collection("urlMap").doc(shrinked);

    docRef.get()
        .then(doc => {
            if (doc.exists) {
                if (process.env.NODE_ENV !== "production") {
                    console.log(doc.data());
                }
                window.location.replace(doc.data()["expanded"]);
            } else {
                if (process.env.NODE_ENV !== "production") {
                    console.log("no document");
                }
                setErrorMsg(404);
            }
        })
        .catch(e => {
            if (process.env.NODE_ENV !== "production") {
                console.log(e);
            }
            setErrorMsg(503);
        });
        
    return (
        errorMsg == "" ?
            null :
            <Fragment>
                <ErrorCard errorMsg={errorMsg} />
            </Fragment>
    );
}

ExpandUrl.propTypes = {
    location: PropTypes.object.isRequired,
};
  
export default ExpandUrl;
