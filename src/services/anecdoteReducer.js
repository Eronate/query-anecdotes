const anecdoteReducer = (state, action) => {
    switch(action.type){
    case 'CREATED':
        return `created anecdote ${action.payload}`
    case 'VOTED':
        return `voted anecdote ${action.payload}`
    case 'ERROR':
        return 'Your anecdote must be at least 5 characters long'
    case 'CLEAR':
        return ''
    default:
        return state
    }
}

export default anecdoteReducer