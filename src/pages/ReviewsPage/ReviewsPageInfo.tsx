import { Emoji } from '@components/Emoji/Emoji'

import ALL_SITE_SOURCES from '@assets/images/all-site-sources-3.png'
import EMOJI_APPLE_BAR_CHART from '@assets/images/emoji/emoji-apple-bar-chart.webp'
import EMOJI_APPLE_ROBOT from '@assets/images/emoji/emoji-apple-robot.webp'

const ALL_SITE_SOURCES_ALT = 'auto.ru, drom, avito'

export const ReviewsPageInfo = () => {
	return (
		<>
			<h4 className="section-reviews__title">
				Для подбора необходимо указать параметры интересующего автомобиля
			</h4>
			<p className="section-reviews__paragraph--step-info">
				<Emoji
					src={EMOJI_APPLE_ROBOT}
					alt="🤖"
					size="30px"
					className="section-reviews__paragraph--step-info__emoji"
				/>
				Далее нейросеть подберет отзывы по популярным платформам торговых площадок авто
			</p>
			<p className="section-reviews__paragraph--step-info">
				<Emoji
					src={EMOJI_APPLE_BAR_CHART}
					alt="📊"
					size="30px"
					className="section-reviews__paragraph--step-info__emoji"
				/>
				Составит окрас текста, классифицирует и задаст рейтинг обзора
			</p>
			<img src={ALL_SITE_SOURCES} alt={ALL_SITE_SOURCES_ALT} className="section-reviews__image-site-sources" />
		</>
	)
}
