import { useContext } from "react"
import NotificationContext from "../components/AnecdoteContextProvider"

export const useNotificationState = () => {
    const notificationState = useContext(NotificationContext)
    return notificationState[0]
} 

export const useNotificationDispatch = () => {
    const notificationState = useContext(NotificationContext)
    return notificationState[1]
} 
