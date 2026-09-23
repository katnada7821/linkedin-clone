import { useContext, useEffect, useState } from "react";
import { authDataContext } from "../assets/context/AuthDataContext";
import axios from "axios";
import io from "Socket.io-client";
import { userDataContext } from "../assets/context/UserDataContext";
import { useNavigate } from "react-router-dom";

let socket = io("http://localhost:8000");

function ConnectionButton({ userId }) {

    let { serverUrl } = useContext(authDataContext);
    let { userData } = useContext(userDataContext);

    let [status, setStatus] = useState("");

    let navigate = useNavigate();


    const handleSendConnection = async () => {
        try {
            let result = await axios.post(
                `${serverUrl}/api/connection/send/${userId}`,
                {},
                {
                    withCredentials: true
                }
            );

            console.log(result);

        } catch (error) {
            console.log(error);
        }
    };


    const handleRemoveConnection = async () => {
        try {
            let result = await axios.delete(
                `${serverUrl}/api/connection/remove/${userId}`,
                {
                    withCredentials: true
                }
            );

            console.log(result);

        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {

        if (!userId) return;

        const getStatus = async () => {
            try {

                let result = await axios.get(
                    `${serverUrl}/api/connection/getstatus/${userId}`,
                    {
                        withCredentials: true
                    }
                );

                console.log(result);

                setStatus(result.data.status);

            } catch (error) {
                console.log(error);
            }
        };

        getStatus();

    }, [userId, serverUrl]);


    useEffect(() => {

        if (!userData?._id || !userId) return;

        socket.emit("register", userData._id);

        const handleStatusUpdate = ({ updateUserId, newStatus }) => {

            if (updateUserId == userId) {
                setStatus(newStatus);
            }

        };

        socket.on("statusUpdate", handleStatusUpdate);

        return () => {
            socket.off("statusUpdate", handleStatusUpdate);
        };

    }, [userId, userData?._id]);


    const handleClick = async () => {

        if (status == "disconnect") {

            await handleRemoveConnection();

        } else if (status == "received") {

            navigate("/network");

        } else {

            await handleSendConnection();

        }
    };


    return (
        <button
            className="min-w-[100px] h-[40px] rounded-full border-2 border-[#0A66C2] text-[#0A66C2]"
            onClick={handleClick} disabled={status=="pending"}
        >
            {status}
        </button>
    );
}

export default ConnectionButton;