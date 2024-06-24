import { ComponentPropsWithoutRef, FC } from 'react'

import { CustomLink } from '@components/CustomLink/CustomLink'

import { Avatar } from '@mui/material'

import GITHUB_LOGO from '@assets/images/github-logo.webp'
import TELEGRAM_LOGO from '@assets/images/telegram-logo.webp'

import { StyledContactCard } from './ContactCard.styles'

type ContactCardProps = {
	image: string
	name: string
	role: string
	telegramLink?: string
	githubLink?: string
} & ComponentPropsWithoutRef<'div'>

export const ContactCard: FC<ContactCardProps> = ({
	image,
	name,
	role,
	telegramLink,
	githubLink,
	...props
}) => {
	return (
		<StyledContactCard {...props}>
			<Avatar src={image} alt={name} className="contact-card__avatar">
				{name.slice(0, 2)}
			</Avatar>
			<div className="contact-card__info">
				<h5 className="contact-card__info__name">{name}</h5>
				<p className="contact-card__info__role">{role}</p>
				<nav className="contact-card__info__nav-links">
					{githubLink && (
						<CustomLink to={githubLink} target="_blank" className="contact-card__info__nav-links__link">
							<img src={GITHUB_LOGO} alt="github" className="contact-card__info__nav-links__link__img-logo" />
						</CustomLink>
					)}
					{telegramLink && (
						<CustomLink to={telegramLink} target="_blank" className="contact-card__info__nav-links__link">
							<img src={TELEGRAM_LOGO} alt="telegram" className="contact-card__info__nav-links__link__img-logo" />
						</CustomLink>
					)}
				</nav>
			</div>
		</StyledContactCard>
	)
}
