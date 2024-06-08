import styled from 'styled-components'

type StyledEmojiProps = {
	$size: string
}

export const StyledEmoji = styled.img<StyledEmojiProps>`
	width: ${(props) => props.$size};
	height: ${(props) => props.$size};
	user-select: none;
	pointer-events: none;
`
