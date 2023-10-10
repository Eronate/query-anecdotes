import { createContext, useReducer, useContext } from "react";
import anecdoteReducer from "../services/anecdoteReducer";

const NotificationContext = createContext()

export const AnecdoteContextProvider = (props) => {
    const [state, dispatch] = useReducer(anecdoteReducer, '')

    return (
        <NotificationContext.Provider value={ [state, dispatch] }>
            {props.children}
        </NotificationContext.Provider>
    )
}

export default NotificationContext