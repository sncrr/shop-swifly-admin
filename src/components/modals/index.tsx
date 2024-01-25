import React, { ReactNode } from 'react';
import { useSelector } from "react-redux"
import { Loader } from "./Loader";
import ReactModal from 'react-modal';
import { colors } from '../../theme';

interface Props {
  children: ReactNode,
  isOpen: boolean
}

export const Modal: React.FC<Props> = ({children, isOpen}) => {

  return (
    <ReactModal
      isOpen={isOpen}
      ariaHideApp={false}
      style={{
        overlay: {zIndex: 50, padding: 0},
        content: {
          background: colors.transparent, 
          margin: 0, 
          padding: 0, 
          inset: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }
      }}
    >
      {children}
    </ReactModal>
  )
}

export function ModalContainer ({

} : any) {

  const { 
    loaderModal 
  } = useSelector((state:any) => state.modal);

  return (
    <>
      { loaderModal && <Loader payload={loaderModal} />}
    </>
  )
}