import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { comments, currentUser } from '../data.json';
import { AppDispatch } from './store';
import { CommentType, ReplyType } from './types';
import * as dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    comments: [] as CommentType[]
  },
  reducers: {
    initialize: () => {
      const commentsFromStorage = localStorage.getItem('comments-data')
      if (commentsFromStorage) {
        return {
          comments: (JSON.parse(commentsFromStorage) as CommentType[]).sort((a, b) => b.score - a.score)
        }
      } else {
        localStorage.setItem('comments-data', JSON.stringify(comments))
      }
      return { comments: comments.sort((a, b) => b.score - a.score) }
    },
    update: (state, action: PayloadAction<CommentType | ReplyType>) => {
      const updatingComments = (data: CommentType[] | ReplyType[]) => {
        return data.map((comment: CommentType) => {
          if (comment?.replies?.length > 0) {
            const updated = updatingComments(comment.replies)
            comment.replies = updated
          }
          return comment.id === action.payload.id ? action.payload : comment
        })
      }

      const updatedComments = updatingComments(state.comments)

      localStorage.setItem('comments-data', JSON.stringify(updatedComments))
      state.comments = updatedComments
    },
    add: (state, action: PayloadAction<string>) => {
      const newComment = {
        id: Math.floor(Math.random() * 1000),
        content: action.payload,
        score: 0,
        createdAt: dayjs().toString(),
        user: currentUser,
        replies: []
      }
      state.comments.push(newComment)
      localStorage.setItem('comments-data', JSON.stringify(state.comments))
    },
    edit: (state, action: PayloadAction<{ content: string, id: number }>) => {
      const editingComment = (data: CommentType[] | ReplyType[]) => {
        return data.map((comment: CommentType) => {
          if (comment?.replies?.length > 0) {
            editingComment(comment.replies)
          }
          if (comment.id === action.payload.id) {
            comment.content = action.payload.content
            console.log(comment);

          }
          return comment
        })
      }

      const commentsEdited = editingComment(state.comments)

      state.comments = commentsEdited
      localStorage.setItem('comments-data', JSON.stringify(state.comments))
    },
    reply: (state, action: PayloadAction<{ content: string, parentId: number }>) => {
      const addingReply = (data: CommentType[] | ReplyType[]) => {
        return data.map((comment: CommentType) => {
          if (comment?.replies?.length > 0) {
            addingReply(comment.replies)
          }
          if (comment.id === action.payload.parentId) {
            comment.replies.push({
              id: Math.floor(Math.random() * 1000),
              content: action.payload.content,
              replyingTo: comment.user.username,
              score: 0,
              createdAt: dayjs().toString(),
              user: currentUser,
              replies: []
            })
          }
          return comment
        })
      }

      const replyAdded = addingReply(state.comments)

      state.comments = replyAdded
      localStorage.setItem('comments-data', JSON.stringify(state.comments))
    },
    remove: (state, action: PayloadAction<{ id: number }>) => {
      const removeComment = (data: CommentType[] | ReplyType[]) => {
        return data.filter((comment: CommentType) => {
          if (comment?.replies?.length > 0) {
            const replies = removeComment(comment.replies)
            comment.replies = replies
          }

          if (comment.id !== action.payload.id) {
            return comment
          }
        })
      }

      const newComments = removeComment(state.comments)

      state.comments = newComments
      localStorage.setItem('comments-data', JSON.stringify(state.comments))
    }
  }
})

export const { initialize, update, add, reply, edit, remove } = commentsSlice.actions

export const initializeComments = () => {
  return (dispatch: AppDispatch) => {
    dispatch(initialize())
  }
}

export const updateComment = (newComment: CommentType) => {
  return (dispatch: AppDispatch) => {
    dispatch(update(newComment))
  }
}

export const addComment = (content: string) => {
  return (dispatch: AppDispatch) => {
    dispatch(add(content))
  }
}

export const replyComment = ({ content, parentId }: { content: string, parentId: number }) => {
  return (dispatch: AppDispatch) => {
    dispatch(reply({ content, parentId }))
  }
}

export const editComment = ({ content, id }: { content: string, id: number }) => {
  return (dispatch: AppDispatch) => {
    dispatch(edit({ content, id }))
  }
}

export const deleteComment = (id: number) => {
  return (dispatch: AppDispatch) => {
    dispatch(remove({ id }))
  }
}

export default commentsSlice.reducer
