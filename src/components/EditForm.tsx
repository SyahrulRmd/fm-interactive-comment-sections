import { SyntheticEvent, useState } from 'react';

import { currentUser } from '../../data.json';
import { editComment } from '../commentsReducer';
import { useAppDispatch } from '../hooks';
import { ReplyType } from '../types';

const EditForm = ({ comment, setShowEdit }: { comment: ReplyType, setShowEdit: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const dispatch = useAppDispatch()

  const [editInput, setEditInput] = useState<string>(comment.content)
  const sendReply = (e: SyntheticEvent) => {
    e.preventDefault()
    if (!editInput) {
      return
    }
    dispatch(editComment({ content: editInput, id: comment.id }))
    setEditInput('')
    setShowEdit(false)
  }

  return (
    <form onSubmit={sendReply}>
      <div className='flex gap-4 p-6 mt-4 bg-white xs:flex-col rounded-xl'>
        <div className='flex items-start flex-grow gap-4'>
          <img src={currentUser.image.webp} alt="Profil Picture" width={40} height={40} />
          <div className='flex-grow'>
            <textarea
              rows={3}
              placeholder='Edit comment...'
              defaultValue={`${comment.content}`}
              onChange={e => setEditInput(e.target.value)}
              className='w-full h-full px-4 py-2 border rounded-lg border-light-gray'
            />
          </div>
        </div>
        <div>
          <button className='w-full px-5 py-2.5 text-sm text-white rounded-lg bg-moderate-blue hover:bg-moderate-blue/95 active:bg-moderate-blue/90'>UPDATE</button>
        </div>
      </div>
    </form>
  )
}
 
export default EditForm;
