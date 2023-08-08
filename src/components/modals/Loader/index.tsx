
import { Modal } from '..';

export function Loader ({isOpen = false}) {

  return (
    <Modal isOpen={isOpen}>
      <span>Loading...</span>
    </Modal>
  )
}