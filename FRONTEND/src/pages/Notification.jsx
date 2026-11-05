import Nav from "../components/Nav";
import { useContext, useEffect, useState } from "react";
import { authDataContext } from "../assets/context/AuthDataContext";
import { userDataContext } from "../assets/context/UserDataContext";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";
import dp from "../assets/dp.png";

function Notification() {
  const { serverUrl } = useContext(authDataContext);
  const { handleGetProfile } = useContext(userDataContext);

  const [notificationsData, setNotificationsData] = useState([]);
  const [loading, setLoading] = useState(true);

  // GET NOTIFICATIONS
  useEffect(() => {
    let ignore = false;

    const getNotifications = async () => {
        try {
            const result = await axios.get(
                serverUrl + "/api/notification/get",
                { withCredentials: true }
            );

            if (!ignore) {
                setNotificationsData(result.data);
            }
        } catch (error) {
            if (!ignore) {
                console.log(error);
            }
        } finally {
            if (!ignore) {
                setLoading(false);
            }
        }
    };

    getNotifications();

    return () => {
        ignore = true;
    };
}, [serverUrl]);
  // DELETE SINGLE NOTIFICATION
  const handleDeleteNotification = async (id) => {
    try {
      await axios.delete(
        serverUrl + `/api/notification/delete/${id}`,
        { withCredentials: true }
      );

      setNotificationsData((prev) =>
        prev.filter((noti) => noti._id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  // CLEAR ALL NOTIFICATIONS
  const handleClearAllNotifications = async () => {
    try {
      await axios.delete(
        serverUrl + "/api/notification/clear-all",
        { withCredentials: true }
      );

      setNotificationsData([]);
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div className="min-h-screen w-full bg-[#f0efe7] pt-24 px-4 sm:px-6 pb-10">
      <Nav />

      <div className="max-w-3xl mx-auto flex flex-col gap-5 mt-6">

        {/* HEADER */}
        <div className="w-full bg-white shadow-sm rounded-xl px-5 py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-700">
              Notifications
            </h2>

            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
              {notificationsData.length}
            </span>
          </div>

          {/* CLEAR ALL - ONLY WHEN NOTIFICATIONS EXIST */}
          {notificationsData.length > 0 && (
            <button
              onClick={handleClearAllNotifications}
              className="text-sm sm:text-base text-red-500 hover:text-red-700 font-medium transition-colors whitespace-nowrap"
            >
              Clear All
            </button>
          )}
        </div>

        {/* NOTIFICATIONS LIST */}
        <div className="w-full bg-white shadow-sm rounded-xl overflow-hidden">

          {loading ? (
            <div className="py-16 text-center text-gray-500">
              Loading notifications...
            </div>
          ) : notificationsData.length > 0 ? (

            <div className="divide-y divide-gray-100">

              {notificationsData.map((noti) => (
                <div
                  key={noti._id}
                  className="w-full flex items-start gap-3 sm:gap-4 px-4 sm:px-6 py-5 hover:bg-gray-50 transition-colors"
                >

                  {/* PROFILE IMAGE */}
                  <div
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden shrink-0 cursor-pointer"
                    onClick={() =>
                      handleGetProfile(noti.sender?.userName)
                    }
                  >
                    <img
                      src={noti.relatedUser?.profileImage || dp}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* NOTIFICATION CONTENT */}
                  <div className="flex-1 min-w-0">

                    <p className="text-sm sm:text-base text-gray-700 break-words">
                      <span
                        className="font-semibold cursor-pointer hover:underline"
                        onClick={() =>
                          handleGetProfile(noti.sender?.userName)
                        }
                      >
                        {noti.relatedUser?.firstName}{" "}
                        {noti.relatedUser?.lastName}
                      </span>

                      <span className="text-gray-600">
                        {noti.type === "like"
                          ? " liked your post."
                          : noti.type === "comment"
                          ? " commented on your post."
                          : noti.type === "connection"
                          ? " sent you a connection request."
                          : " interacted with you."}
                      </span>
                    </p>

                    {/* COMMENT PREVIEW */}
                    {noti.type === "comment" && noti.comment && (
                      <div className="mt-2 bg-gray-50 border border-gray-100 rounded-lg p-3">
                        <p className="text-sm text-gray-600 break-words">
                          "{noti.comment}"
                        </p>
                      </div>
                    )}

                    {/* POST PREVIEW */}
                    {(noti.type === "like" ||
                      noti.type === "comment") &&
                      noti.post && (
                        <div className="mt-3 bg-gray-50 border border-gray-100 rounded-lg p-3">
                          <p className="text-xs text-gray-500 mb-1">
                            On your post:
                          </p>

                          <p className="text-sm text-gray-700 line-clamp-3 break-words">
                            {noti.post.description}
                          </p>

                          {noti.post.image && (
                            <img
                              src={noti.post.image}
                              alt=""
                              className="mt-2 max-h-40 rounded-lg object-cover"
                            />
                          )}
                        </div>
                      )}
                  </div>

                  {/* DELETE SINGLE NOTIFICATION */}
                  <button
                    onClick={() =>
                      handleDeleteNotification(noti._id)
                    }
                    className="shrink-0 p-2 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                    title="Delete notification"
                  >
                    <RxCross2 size={20} />
                  </button>

                </div>
              ))}

            </div>

          ) : (

            /* EMPTY STATE */
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
              <div className="text-4xl mb-3">🔔</div>

              <h3 className="text-lg font-semibold text-gray-700">
                No notifications yet
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                When someone interacts with you, you'll see it here.
              </p>
            </div>

          )}

        </div>
      </div>
    </div>
  );
}

export default Notification;