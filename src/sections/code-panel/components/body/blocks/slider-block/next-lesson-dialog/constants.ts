import * as Yup from 'yup'

export type Props = {
  open: boolean
  onClose: () => void
  onSubmitLesson: () => void
  lessonName: string
}

export interface FormValuesProps {
  rating: number
  feedbackMsg: string
  feedbackSelectPositive: FeedbackPositiveEnum | 'empty'
  feedbackSelectNegative: FeedbackNegativeEnum | 'empty'
}

export enum FeedbackPositiveEnum {
  codeOutcome = 'The code outcome',
  other = 'Other',
}

export enum FeedbackNegativeEnum {
  codeTest = 'Code tests did not trigger',
  instructions = 'Instructions were unclear or confusing',
  learn = 'I did not learn anything',
  notLike = 'I did not like the outcome',
  other = 'Other',
}

export const CreateFeedbackSchema = Yup.object().shape({
  feedbackMsg: Yup.string().trim().max(500, 'Feedback must be at most 500 characters'),
  feedbackSelectPositive: Yup.string()
    .oneOf(Object.values(FeedbackPositiveEnum), 'Invalid positive feedback option')
    .optional(),
  feedbackSelectNegative: Yup.string()
    .oneOf(Object.values(FeedbackNegativeEnum), 'Invalid negative feedback option')
    .optional(),
})

export const animateCustomBg = () => {
  const gradient = (deg: number) =>
    `linear-gradient(${deg}deg, 
      #00140A 0%, 
      #00140A 49%, 
      #00AB55 51%, 
       #00AB55 100%)`
  return {
    animate: {
      backgroundPosition: ['99% center', '1% center'],
      backgroundImage: [gradient(270), gradient(270)],
      backgroundSize: ['300% 100%', '300% 100%'],
      transition: { duration: 5, ease: 'linear', delay: 1 },
    },
  }
}
