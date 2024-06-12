import { ComponentPropsWithoutRef, FC } from 'react'
import { useDispatch } from 'react-redux'

import { updateReviews } from '@redux/slices/reviews/slice'

import { Button } from '@mui/material'

import { StyledReviewsSettings } from './ReviewsSettings.styles'
import { ReviewsSettingsFilterScore } from './ReviewsSettingsFilterScore'
import { ReviewsSettingsSiteSources } from './ReviewsSettingsSiteSources'

type ReviewsSettingsProps = {} & ComponentPropsWithoutRef<'article'>

const ReviewsSettings: FC<ReviewsSettingsProps> = ({ ...props }) => {
	const dispatch = useDispatch()

	const handleClickApplySettings = () => {
		dispatch(updateReviews())
	}

	return (
		<StyledReviewsSettings {...props}>
			<ReviewsSettingsSiteSources />
			<ReviewsSettingsFilterScore />
			<Button onClick={handleClickApplySettings} variant="contained">
				Применить
			</Button>
		</StyledReviewsSettings>
	)
}

export default ReviewsSettings
