import { ComponentPropsWithoutRef, FC, memo } from 'react'

import { CustomLink } from '@components/CustomLink/CustomLink'

import { StyledFooter } from './Footer.styles'

type FooterProps = {} & ComponentPropsWithoutRef<'footer'>

const DEVELOPER_GITHUB_URL = 'https://github.com/jsinkx'

export const Footer: FC<FooterProps> = memo(({ ...props }) => {
	return (
		<StyledFooter {...props}>
			<p className="footer__paragraph--developer-info">
				<CustomLink to={DEVELOPER_GITHUB_URL} target="_blank" className="footer__paragraph--developer-info__link">
					Code by jsink_
				</CustomLink>
			</p>
		</StyledFooter>
	)
})
