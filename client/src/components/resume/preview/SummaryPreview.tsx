import React from 'react'

function SummaryPreview({resumeInfo}:{resumeInfo:IResumeInfo|undefined}) {
  return (
    <p className='text-xs'>
        {resumeInfo?.summery}
    </p>
  )
}

export default SummaryPreview