import { ComponentPropsWithoutRef, FC } from 'react'
import { useDispatch } from 'react-redux'

import { updateReviews } from '@redux/slices/reviews/slice'

import { Button } from '@mui/material'

import { StyledReviewsSettings } from './ReviewsSettings.styles'
import { ReviewsSettingsFilterScore } from './ReviewsSettingsFilterScore'
import { ReviewsSettingsSiteSources } from './ReviewsSettingsSiteSources'

type ReviewsSettingsProps = {
	isDisplaySiteSources?: boolean
	isDisplayFilterScore?: boolean
	isDisplayButtonApply?: boolean
} & ComponentPropsWithoutRef<'article'>

const ReviewsSettings: FC<ReviewsSettingsProps> = ({
	isDisplayButtonApply = false,
	isDisplaySiteSources = false,
	isDisplayFilterScore = false,
	...props
}) => {
	const dispatch = useDispatch()

	const handleClickApplySettings = () => {
		dispatch(updateReviews())
	}

	return (
		<StyledReviewsSettings {...props}>
			{isDisplaySiteSources && <ReviewsSettingsSiteSources />}
			{isDisplayFilterScore && <ReviewsSettingsFilterScore />}
			{isDisplayButtonApply && (
				<Button onClick={handleClickApplySettings} variant="contained">
					Применить
				</Button>
			)}
		</StyledReviewsSettings>
	)
}

export default ReviewsSettings
