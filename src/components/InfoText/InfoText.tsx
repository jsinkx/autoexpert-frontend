import { ComponentPropsWithoutRef, FC } from 'react'

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'

import { StyledInfoText } from './InfoText.styles'

type InfoTextProps = {
	text: string
} & ComponentPropsWithoutRef<'p'>

export const InfoText: FC<InfoTextProps> = ({ text, ...props }) => {
	return (
		<StyledInfoText {...props}>
			<span>
				<InfoOutlinedIcon fontSize="small" className="icon" />
				{text}
			</span>
		</StyledInfoText>
	)
}
