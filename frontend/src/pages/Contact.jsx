import React from 'react'
import LeftPart from './LeftPart'
import RightPart from './RightPart'

const Contact = () => {
  return (
    <div className='flex min-h-screen gap-2 overflow-x-hidden'>
      <LeftPart/>
      <RightPart/>
    </div>
  )
}

export default Contact
