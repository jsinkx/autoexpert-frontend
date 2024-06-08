import { ComponentPropsWithoutRef, FC } from 'react'

import { StyledEmoji } from './Emoji.styles'

type EmojiProps = {
	size?: string
	alt: string
} & ComponentPropsWithoutRef<'img'>

export const Emoji: FC<EmojiProps> = ({ size = '20px', alt, ...props }) => {
	return <StyledEmoji $size={size} alt={alt} {...props} />
}
