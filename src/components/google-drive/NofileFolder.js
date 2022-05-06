import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const NofileFolder = ({icon, text1, text2}) => {
  return (
    <div className='d-flex align-items-center justify-content-center w-100' style={{height: '100%'}}>
        <p className='d-flex align-items-center justify-content-center flex-column text-muted'>
            <FontAwesomeIcon icon={icon} className='fs-1 text-grey'/>
            <span className='fs-3'>{text1}</span>
            <span>{text2}</span>
        </p>
    </div>
  )
}

export default NofileFolder