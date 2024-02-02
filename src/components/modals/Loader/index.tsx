
import { Modal } from '..';
import { DefaultLoader } from '../../loader';

export function Loader ({payload}: any) {

  return (
    <Modal isOpen={!!payload}>
      <DefaultLoader />
      {
        payload.text && <span className='mt-4'>{payload.text}</span>
      }
    </Modal>
  )
}