import { FC } from 'react'

import AUTO_RU_LOGO from '@assets/images/auto-ru-logo.png'
import AVITO_LOGO from '@assets/images/avito-logo.png'
import DROM_LOGO from '@assets/images/drom-logo.png'

type ReviewSiteSourceIconProps = {
	source: string
}

export const ReviewSiteSourceIcon: FC<ReviewSiteSourceIconProps> = ({ source }) => {
	switch (source) {
		case 'avito':
			return <img src={AVITO_LOGO} alt="avito" className="review__site-source-icon" />
		case 'auto.ru':
			return <img src={AUTO_RU_LOGO} alt="auto.ru" className="review__site-source-icon" />
		case 'drom':
			return <img src={DROM_LOGO} alt="drom" className="review__site-source-icon" />
		default:
			return null
	}
}
