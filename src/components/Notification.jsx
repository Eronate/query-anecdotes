import { useReducer } from "react"
import anecdoteReducer from "../services/anecdoteReducer"
import { useNotificationState } from "../services/helperFunctions"

const Notification = () => {
  const anecState = useNotificationState()
  
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  return (
    anecState === '' ?
    <div>
    </div>
    :
    <div style={style}>
      {anecState}
    </div>
  )
}

export default Notification
