import React from 'react'

function SummaryPreview({resumeInfo}:{resumeInfo:IResumeInfo|undefined}) {
  return (
    <p className='text-xs'>
        {resumeInfo?.summary}
    </p>
  )
}

export default SummaryPreview