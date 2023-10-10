import axios from "axios";

const baseUrl = 'http://localhost:3001/anecdotes'

const random = () => Math.floor(Math.random() * 100000)

export const asAnecdote = (content) => {
    return {
    "content": content,
    "id": random(),
    "votes": 0
    }
}

export const getAnecdotes = () => {
    return axios.get(baseUrl).then(res => res.data)
}

export const postAnecdote = (anecdote) => {
    return axios.post(baseUrl, anecdote).then(res => res.data)
}

export const likeAnecdote = (anecdote) => { 
    return axios.put(`${baseUrl}/${anecdote.id}`, {
        ...anecdote,
        votes: anecdote.votes + 1
    }).then(res => res.data)
}