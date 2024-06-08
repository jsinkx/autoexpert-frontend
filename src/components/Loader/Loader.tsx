import { FC } from 'react'
import { Discuss, DiscussProps, Style } from 'react-loader-spinner'

import { Colors } from '@shared/colors'

type LoaderProps = {
	variant?: 'loader' | 'search'
	styles?: Style
} & DiscussProps

export const Loader: FC<LoaderProps> = ({ variant = 'loader', styles = {}, ...props }) => {
	switch (variant) {
		case 'loader':
			return (
				<Discuss
					visible
					height="80"
					width="80"
					ariaLabel="discuss-loading"
					wrapperStyle={styles}
					wrapperClass="discuss-wrapper"
					colors={[Colors.BLUE, Colors.BLUE]}
					{...props}
				/>
			)
		case 'search':
			return null
		default:
			return (
				<Discuss
					visible
					height="80"
					width="80"
					ariaLabel="discuss-loading"
					wrapperStyle={styles}
					wrapperClass="discuss-wrapper"
					colors={[Colors.BLUE, Colors.BLUE]}
					{...props}
				/>
			)
	}
}
