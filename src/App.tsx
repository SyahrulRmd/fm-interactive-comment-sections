import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { LayoutGroup, motion } from 'framer-motion';
import { SyntheticEvent, useEffect, useState } from 'react';

import { currentUser } from '../data.json';
import { addComment, initializeComments } from './commentsReducer';
import Comment from './components/Comment';
import { useAppDispatch, useAppSelector } from './hooks';

dayjs.extend(relativeTime)

function App() {
  const comments = useAppSelector(state => state.comment.comments)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initializeComments())
  }, [])

  const [commentInput, setCommentInput] = useState<string>('')
  const sendComment = (e: SyntheticEvent) => {
    e.preventDefault()
    if (!commentInput) {
      return
    }

    dispatch(addComment(commentInput))
    setCommentInput('')
  }

  return (
    <div className="min-h-screen bg-very-light-gray">
      <LayoutGroup >
        <div className="container py-10 xs:p-4">
          <div className="flex flex-col h-auto gap-6">
            {comments.map((comment, key) => (
              <motion.div
                key={key}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ ease: 'easeIn', duration: 0.5, delay: key * 0.1, type: 'spring' }}
              >
                <Comment comment={comment} />
              </motion.div>
            ))}
          </div>
          <form onSubmit={sendComment}>
            <div className='flex gap-4 p-6 mt-6 bg-white xs:flex-col rounded-xl'>
              <div className='flex items-start flex-grow gap-4'>
                <img src={currentUser.image.webp} alt="Profil Picture" width={40} height={40} />
                <div className='flex-grow'>
                  <textarea
                    onChange={e => setCommentInput(e.target.value)}
                    value={commentInput}
                    rows={3}
                    placeholder='Add a comment...'
                    className='w-full h-full px-4 py-2 border rounded-lg border-light-gray'
                  />
                </div>
              </div>
              <div>
                <button
                  className='w-full px-5 py-2.5 text-sm transition-all text-white rounded-lg bg-moderate-blue hover:bg-moderate-blue/95 active:bg-moderate-blue/90'
                >
                  SEND
                </button>
              </div>
            </div>
          </form>
        </div>
      </LayoutGroup>
    </div>
  )
}

export default App
