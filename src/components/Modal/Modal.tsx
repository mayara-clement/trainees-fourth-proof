import { ReactNode } from 'react'
import './index.css'

interface ModalType {
  children?: ReactNode
  isOpen: boolean
  toggle: () => void
}

export default function Modal(props: ModalType) {
  return (
    <>
      {props.isOpen && (
        <>
          <div className="modal-overlay" onClick={props.toggle} />
          <div className="modal-box">{props.children}</div>
        </>
      )}
    </>
  )
}
