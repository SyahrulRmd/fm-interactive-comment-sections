import { Dialog, Transition } from '@headlessui/react'
import { Fragment, SetStateAction } from 'react'

const DeleteDialog = ({ isOpen, setIsOpen, removeComment }: { 
  isOpen: boolean, 
  setIsOpen: React.Dispatch<SetStateAction<boolean>>, 
  removeComment: () => void 
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10 h-screen" onClose={() => setIsOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-sm p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-dark-blue"
                >
                  Delete comment
                </Dialog.Title>
                <div className="mt-2">
                  <p className="font-normal text-grayish-blue">
                    Are you sure want to delete this comment? This will remove the comment
                    and can't be undone.
                  </p>
                </div>

                <div className="flex gap-4 mt-4">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center flex-grow gap-2 px-4 py-3 text-sm font-medium text-white rounded-lg bg-grayish-blue hover:bg-grayish-blue/95 active:bg-grayish-blue/90"
                    onClick={() => setIsOpen(false)}
                  >
                    NO, CANCEL
                  </button>
                  <button
                    onClick={() => removeComment()}
                    className='inline-flex items-center justify-center flex-grow gap-2 px-4 py-3 text-sm font-medium text-white rounded-lg bg-soft-red hover:bg-soft-red/95 active:bg-soft-red/90'
                  >YES, DELETE</button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default DeleteDialog
