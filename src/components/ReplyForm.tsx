import { SyntheticEvent, useState } from 'react';

import { currentUser } from '../../data.json';
import { useAppDispatch } from '../hooks';
import { replyComment } from '../commentsReducer';

const ReplyForm = ({ parentId, setShowReply, parentUsername }: { parentId: number, parentUsername: string, setShowReply: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const dispatch = useAppDispatch()

  const [replyInput, setReplyInput] = useState<string>('')
  const sendReply = (e: SyntheticEvent) => {
    e.preventDefault()
    if (!replyInput) {
      return
    }
    dispatch(replyComment({ content: replyInput, parentId }))
    setReplyInput('')
    setShowReply(false)
  }

  return (
    <form onSubmit={sendReply}>
      <div className='flex gap-4 p-6 mt-4 bg-white xs:flex-col rounded-xl'>
        <div className='flex items-start flex-grow gap-4'>
          <img src={currentUser.image.webp} alt="Profil Picture" width={40} height={40} />
          <div className='flex-grow'>
            <textarea
              rows={3}
              placeholder={`Replying to @${parentUsername}`}
              value={replyInput}
              onChange={e => setReplyInput(e.target.value)}
              className='w-full h-full px-4 py-2 border rounded-lg border-light-gray'
            />
          </div>
        </div>
        <div>
          <button className='w-full px-5 py-2.5 text-sm text-white rounded-lg bg-moderate-blue hover:bg-moderate-blue/95 active:bg-moderate-blue/90'>REPLY</button>
        </div>
      </div>
    </form>
  )
}
 
export default ReplyForm;
