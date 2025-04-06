import PersonalDetailPreview from './preview/PersonalDetaillPreview'
import SummaryPreview from './preview/SummaryPreview'
import ExperiencePreview from './preview/ExperiencePreview'
import EducationalPreview from './preview/EducationalPreview'
import SkillsPreview from './preview/SkillsPreview'

const SharedResumePreview = ({resumeInfo}:{resumeInfo:IResumeInfo|undefined}) => {
  return (
    <div className='shadow-lg h-full p-14 border-t-[20px] bg-white text-black'
    style={{
        borderColor:resumeInfo?.themeColor
    }}>
        {/* Personal Detail  */}
            <PersonalDetailPreview resumeInfo={resumeInfo} />
        {/* Summery  */}
            <SummaryPreview resumeInfo={resumeInfo} />
        {/* Professional Experience  */}
           {resumeInfo?.experiences?.length as number >0&& <ExperiencePreview resumeInfo={resumeInfo} />}
        {/* Educational  */}
        {resumeInfo?.education?.length as number >0&&   <EducationalPreview resumeInfo={resumeInfo} />}
        {/* Skilss  */}
        {resumeInfo?.skills?.length as number >0&&    <SkillsPreview resumeInfo={resumeInfo}/>}
    </div>
  )
}

export default SharedResumePreview