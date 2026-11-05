import { authDataContext } from "./AuthDataContext"

function AuthContext({ children }) {
    const serverUrl="https://linkedin-backend-u0lv.onrender.com"
    let value = {
        serverUrl

    }

    return (
        <authDataContext.Provider value={value}>
            {children}
        </authDataContext.Provider>
    )
}

export default AuthContext
