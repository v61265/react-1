import axios from 'axios'

const feedback_base_url =
  process.env.NODE_ENV === 'production'
    ? 'https://storytelling-prod-4g6paft7cq-de.a.run.app/'
    : 'https://storytelling-dev-4g6paft7cq-de.a.run.app/'

const feedbackRequest = axios.create({
  baseURL: feedback_base_url,
})

export const getFeedbacks = (params) =>
  feedbackRequest.get('/api/feedback', { params })
export const postFeedback = (data) =>
  feedbackRequest.post('/api/feedback', data)
export const getLikes = (params) => feedbackRequest.get('/api/like', { params })
export const giveLikes = (data) => feedbackRequest.put('/api/like', data)
export const verifyRecaptcha = (data) =>
  feedbackRequest.post('/api/verification', data)
export const getOptionSummary = (params) =>
  feedbackRequest.get('/api/option', { params })
export const giveOptions = (data) => feedbackRequest.put('/api/option', data)
