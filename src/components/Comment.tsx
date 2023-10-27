import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useState } from 'react';

import { currentUser } from '../../data.json';
import DeleteIcon from '../assets/icon-delete.svg';
import EditIcon from '../assets/icon-edit.svg';
import MinusIcon from '../assets/icon-minus.svg';
import PlusIcon from '../assets/icon-plus.svg';
import ReplyIcon from '../assets/icon-reply.svg';
import { deleteComment, updateComment } from '../commentsReducer';
import DeleteDialog from '../components/DeleteDialog';
import { useAppDispatch } from '../hooks';
import { ReplyType } from '../types';
import ReplyForm from './ReplyForm';
import EditForm from './EditForm';

dayjs.extend(relativeTime)

const Comment = ({ comment }: { comment: ReplyType }) => {
  const dispatch = useAppDispatch()

  const [showReplyForm, setShowReplyForm] = useState<boolean>(false)
  const [showEditForm, setShowEditForm] = useState<boolean>(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false)

  const handleScore = (operation: 'plus' | 'minus') => {
    const newComment = { ...comment }
    if (operation === 'plus') {
      newComment.score += 1
    } else if (operation === 'minus' && comment.score > 0) {
      newComment.score -= 1
    }

    dispatch(updateComment(newComment))
  }

  const removeComment = () => {
    dispatch(deleteComment(comment.id))
    setShowDeleteDialog(false)
  }

  return (
    <div>
      <div className='relative flex gap-6 p-6 bg-white rounded-xl xs:flex-wrap-reverse'>
        <div className='flex flex-col items-center gap-2 p-2 rounded-md xs:flex-row bg-very-light-gray h-fit'>
          <button onClick={() => handleScore('plus')} className='w-5 h-5 p-1 font-medium transition-all rounded-full text-light-grayish-blue hover:bg-moderate-blue/5 active:bg-moderate-blue/10'>
            <img src={PlusIcon} alt="" className='w-full' />
          </button>
          <span className='font-medium text-moderate-blue'>{comment.score}</span>
          <button onClick={() => handleScore('minus')} className='w-5 h-5 p-1 font-medium transition-all rounded-full text-light-grayish-blue hover:bg-moderate-blue/5 active:bg-moderate-blue/10'>
            <img src={MinusIcon} alt="" className='w-full' />
          </button>
        </div>
        <div>
          <div className='flex items-center justify-between mb-3'>
            <div className='flex items-center gap-4 flex-wrap max-w-[332px]'>
              <img src={comment.user.image.webp} alt="Profile Picture" width={32} height={32} />
              <h6 className='font-medium text-dark-blue'>{comment.user.username}</h6>
              {currentUser.username === comment.user.username && (
                <div className='px-2 text-sm text-white rounded-sm bg-moderate-blue'>
                  you
                </div>
              )}
              <p className='text-sm text-grayish-blue'>{dayjs(comment.createdAt).fromNow()}</p>
            </div>
            {currentUser.username === comment.user.username ? (
              <div className='absolute flex gap-6 right-6 xs:bottom-8 xs:gap-4'>
                <button onClick={() => setShowDeleteDialog(true)} className='inline-flex items-center gap-2 p-2 font-medium transition-all rounded-lg text-soft-red hover:bg-soft-red/10 active:bg-soft-red/20'>
                  <img src={DeleteIcon} alt="" />
                  Delete
                </button>
                <button onClick={() => setShowEditForm(!showEditForm)} className='inline-flex items-center gap-2 p-2 font-medium transition-all rounded-lg text-moderate-blue hover:bg-moderate-blue/10 active:bg-moderate-blue/20'>
                  <img src={EditIcon} alt="" />
                  Edit
                </button>
              </div>
            ) : (
              <div className='absolute right-6 xs:bottom-8'>
                <button
                  onClick={() => setShowReplyForm(!showReplyForm)}
                  className='inline-flex items-center gap-2 p-2 font-medium transition-all rounded-lg text-moderate-blue hover:bg-moderate-blue/10 active:bg-moderate-blue/20'
                >
                  <img src={ReplyIcon} alt="" />
                  Reply
                </button>
              </div>
            )}
          </div>
          <div>
            <p className='text-grayish-blue'>
              {comment?.replyingTo && (
                <span className='font-medium text-moderate-blue'>@{comment.replyingTo}</span>
              )}
              {' '}
              {comment.content}
            </p>
          </div>
        </div>
      </div>
      {showReplyForm && (
        <ReplyForm parentId={comment.id} parentUsername={comment.user.username} setShowReply={setShowReplyForm} />
      )}

      {showEditForm && (
        <EditForm comment={comment} setShowEdit={setShowEditForm} />
      )}

      {currentUser.username === comment.user.username && (
        <DeleteDialog isOpen={showDeleteDialog} setIsOpen={setShowDeleteDialog} removeComment={removeComment} />
      )}

      {comment.replies && comment.replies.length > 0 && (
        <div className='pl-10 mt-6 ml-10 border-l-2 xs:pl-4 xs:ml-0 border-l-light-gray'>
          <div className="flex flex-col gap-6">
            {comment.replies.map((reply, key) => (
              <Comment comment={reply} key={key} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Comment;