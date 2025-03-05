import React from 'react'

import { RHFSelect, RHFTextField } from '@root/src/components'
import { useTranslate } from '@root/src/utils/translateHelper'

import { FeedbackNegativeEnum, FeedbackPositiveEnum } from './constants'

type Props = {}

function FeedbackFields({}: Props) {
  const translate = useTranslate()

  const feedbackNegativeTranslations = {
    [FeedbackNegativeEnum.codeTest]: translate('feedback_negative_codeTest'),
    [FeedbackNegativeEnum.instructions]: translate('feedback_negative_instructions'),
    [FeedbackNegativeEnum.learn]: translate('feedback_negative_learn'),
    [FeedbackNegativeEnum.notLike]: translate('feedback_negative_notLike'),
    [FeedbackNegativeEnum.other]: translate('feedback_negative_other'),
  }

  const feedbackPositiveTranslations = {
    [FeedbackPositiveEnum.codeOutcome]: translate('feedback_positive_codeOutcome'),
    [FeedbackPositiveEnum.other]: translate('feedback_positive_other'),
  }

  return (
    <>
      <RHFSelect
        size='small'
        native
        name='feedbackSelectNegative'
        sx={{ pb: 2 }}
        label={translate('next_lesson_modal_select_label_1')}
      >
        <option
          key='empty'
          value='empty'
        ></option>
        {Object.entries(feedbackNegativeTranslations).map(([key, value]) => (
          <option
            key={key}
            value={key}
          >
            {value}
          </option>
        ))}
      </RHFSelect>
      <RHFSelect
        size='small'
        native
        name='feedbackSelectPositive'
        label={translate('next_lesson_modal_select_label_2')}
        sx={{ pb: 2 }}
      >
        <option
          key='empty'
          value='empty'
        ></option>
        {Object.entries(feedbackPositiveTranslations).map(([key, value]) => (
          <option
            key={key}
            value={key}
          >
            {value}
          </option>
        ))}
      </RHFSelect>

      <RHFTextField
        size='small'
        name='feedbackMsg'
        placeholder={translate('next_lesson_modal_textfield')}
        multiline
        rows={3}
      />
    </>
  )
}

export default FeedbackFields
