import { useMutation, useQueryClient } from "@tanstack/react-query"
import { postAnecdote, asAnecdote } from "../services/anecdoteService"
import { useNotificationDispatch, useNotificationState } from "../services/helperFunctions"
import Notification from "./Notification"
const AnecdoteForm = () => {

  const client = useQueryClient()
  const notifDispatch = useNotificationDispatch()
  const notifState = useNotificationState()

  const mutation = useMutation({
    mutationFn: postAnecdote,
    onSuccess: (data) => {
      client.invalidateQueries({queryKey: ['anecdotes']})
      notifDispatch({
        type: 'CREATED', 
        payload: data.content
      })
      setTimeout( () => {
        notifDispatch({
          type: 'CLEAR'
        })
      }, 5000)
    }
  })
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value 
    event.target.anecdote.value = ''
    mutation.mutate(asAnecdote(content))
} 

  if(mutation.isError)
  {
    notifDispatch({
      type: 'ERROR'
    })
    // setTimeout( () => {
    //   notifDispatch({
    //     type: 'CLEAR'
    //   })
    // }, 5000)
  }

  return (
    <div>
      {
        mutation.isLoading && 
        <div>
          Creating your anecdote...
        </div>
      }
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
