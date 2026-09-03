import { authDataContext } from "./AuthDataContext"

function AuthContext({ children }) {
    const serverUrl="http://localhost:8000"
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