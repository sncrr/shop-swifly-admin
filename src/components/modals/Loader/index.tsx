
import { Modal } from '..';

export function Loader ({payload}: any) {

  return (
    <Modal isOpen={!!payload}>
      <span>Loading...</span>
    </Modal>
  )
}