import { useContext, useEffect, useState } from "react";
import { authDataContext } from "./AuthDataContext";
import { userDataContext } from "./UserDataContext";
import axios from "axios";

function UserContext({ children }) {

    let [userData, setUserData] = useState(null);
    let [edit, setEdit] = useState(false);
    let [postData, setPostData] = useState([]);

    let { serverUrl } = useContext(authDataContext);


    // Get posts
    const getPost = async () => {
        try {

            let result = await axios.get(
                serverUrl + "/api/post/getpost",
                { withCredentials: true }
            );

            console.log("POST DATA:", result.data);

            setPostData(result.data);

        } catch (error) {

            console.log("GET POST ERROR:", error);

        }
    };


    // Get current user
    useEffect(() => {

        const getCurrentUser = async () => {
            try {

                let result = await axios.get(
                    serverUrl + "/api/user/currentuser",
                    { withCredentials: true }
                );

                setUserData(result.data);

            } catch (error) {

                console.log("GET CURRENT USER ERROR:", error);
                setUserData(null);

            }
        };

        getCurrentUser();

    }, [serverUrl]);


    // Get posts when serverUrl is available
    useEffect(() => {

        const fetchPosts = async () => {
            try {

                let result = await axios.get(
                    serverUrl + "/api/post/getpost",
                    { withCredentials: true }
                );

                console.log("POST DATA:", result.data);

                setPostData(result.data);

            } catch (error) {

                console.log("GET POST ERROR:", error);

            }
        };

        fetchPosts();

    }, [serverUrl]);


    const value = {
        userData,
        setUserData,
        edit,
        setEdit,
        postData,
        setPostData,
        getPost
    };


    return (
        <userDataContext.Provider value={value}>
            {children}
        </userDataContext.Provider>
    );
}

export default UserContext;