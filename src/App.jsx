import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, likeAnecdote } from './services/anecdoteService'
import { useMutation } from '@tanstack/react-query'
import { useNotificationDispatch, useNotificationState } from './services/helperFunctions'

const App = () => {

  const client = useQueryClient()
  const notifDispatch = useNotificationDispatch()
  const notifState = useNotificationState()

  const anecdotes = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })

  const likeMutation = useMutation({
    mutationFn: likeAnecdote,
    onSuccess: () => client.invalidateQueries({queryKey: ['anecdotes']})
  })

  const handleVote = (anecdote) => {
    likeMutation.mutate(anecdote)
    notifDispatch({
      type: 'VOTED',
      payload: anecdote.content
    })
    setTimeout(() => notifDispatch({
      type: 'CLEAR'
    }), 5000)
  }

  const { isLoading, isError } = anecdotes

  if(isLoading)
  {
    console.log(anecdotes)
    return(
      <div>Loading...</div>
    )
  }
  else if(isError)
    return(
      <div>Could not fetch anecdotes.</div>
    )
  
  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification/>
      <AnecdoteForm />
    
      {anecdotes.data.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
