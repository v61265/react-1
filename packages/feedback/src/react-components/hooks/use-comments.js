import React /* eslint-disable-line */, { useState, useRef, useEffect, useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { getFeedbacks, postFeedback } from '../api'
import useUser from './use-user'

const initialCommentCount = 3
const moreCommentCount = 10

/**
 * @typedef {import('../../typedef').Comment} Comment
 * @typedef {import('../../typedef').CommentManager} CommentManager
 *
 * @param {string} formId
 * @param {string} fieldId
 * @param {string}  [identifier]
 * @return {CommentManager}
 */
export default function useComments(formId, fieldId, identifier) {
  const [showingComments, setShowingComments] = useState([])
  const [noMoreComment, setNoMoreComment] = useState(false)
  const hidingCommentsRef = useRef([])
  const allCommentsRef = useRef([])
  const skipRef = useRef(0)
  const takeRef = useRef(initialCommentCount + 2 * moreCommentCount)
  const { userId } = useUser()

  const convertDateFromISO8601 = (dateString) => {
    const date = new Date(dateString)
    return `${date.getFullYear()}/${date.getMonth() +
      1}/${date.getDate()} ${date.getHours()}:${(date.getMinutes() < 10
      ? '0'
      : '') + date.getMinutes()}`
  }

  const fetchComments = useCallback(
    async (showCommentCount, firstTime = false) => {
      try {
        console.log('fetchComments')
        const result = await getFeedbacks({
          form: formId,
          field: fieldId,
          identifier: identifier,
          take: takeRef.current,
          skip: skipRef.current,
        })
        if (result?.data) {
          const {
            data: { formResults },
            skip,
          } = result.data
          skipRef.current = skip
          if (firstTime) {
            takeRef.current = 2 * moreCommentCount
          }
          if (formResults.length) {
            const allCommentsIds = allCommentsRef.current.map(
              (comment) => comment.id
            )
            const comments = formResults
              .filter(({ id }) => allCommentsIds.includes(id) === false)
              .map(({ id, name, result, responseTime }) => ({
                id,
                name,
                content: result,
                date: convertDateFromISO8601(responseTime),
              }))
            if (comments.length !== formResults.length) {
              console.log('filter repitition')
            }

            if (comments.length === 0) {
              // handle duplicated request during initialization
              return
            }

            hidingCommentsRef.current = [
              ...hidingCommentsRef.current,
              ...comments,
            ]
            allCommentsRef.current = [...allCommentsRef.current, ...comments]
          } else {
            setNoMoreComment(true)
          }
          const commentsToShow = hidingCommentsRef.current.splice(
            0,
            showCommentCount
          )
          setShowingComments((comments) => [...comments, ...commentsToShow])
        }
      } catch (error) {
        // do nothing for now
      }
    }
  )

  const loadMoreComments = async () => {
    if (hidingCommentsRef.current.length < moreCommentCount && !noMoreComment) {
      fetchComments(moreCommentCount)
    } else {
      const commentsToShow = hidingCommentsRef.current.splice(
        0,
        moreCommentCount
      )
      setShowingComments((comments) => [...comments, ...commentsToShow])
    }
  }

  const postComment = async (textareaValue) => {
    const date = new Date()

    // add comment before sending request
    const newComment = {
      id: uuidv4(), //since no return the real id, randomly generate one
      name: userId,
      content: textareaValue,
      date: convertDateFromISO8601(date),
    }
    setShowingComments((comments) => [newComment, ...comments])
    // send request without error handle
    try {
      const result = await postFeedback({ // eslint-disable-line
        name: userId,
        form: formId,
        identifier: identifier,
        responseTime: date,
        field: fieldId,
        userFeedback: textareaValue,
      })
    } catch (error) {
      // do nothing for now
    }
  }

  useEffect(() => {
    fetchComments(initialCommentCount, true)
  }, [])

  return {
    comments: showingComments,
    noMoreComment,
    loadMoreComments,
    postComment,
  }
}
