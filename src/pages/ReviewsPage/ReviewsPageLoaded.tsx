import { Review } from '@components/Review/Review'
import { Tag } from '@components/Tag/Tag'

const MOCK_TAGS = [
	{
		title: 'Комфорт',
		count: 25,
	},
	{
		title: 'Авто',
		count: 21,
	},
	{
		title: 'Новый',
		count: 20,
	},
	{
		title: 'Отличный',
		count: 15,
	},
	{
		title: 'Не',
		count: 15,
	},
	{
		title: 'Интересный',
		count: 15,
	},
	{
		title: 'Мощный',
		count: 10,
	},
	{
		title: 'Динамичный',
		count: 9,
	},
	{
		title: 'Корейский',
		count: 8,
	},
	{
		title: 'Разный',
		count: 6,
	},
	{
		title: 'Веселый',
		count: 5,
	},
	{
		title: 'Практичный',
		count: 5,
	},
	{
		title: 'Глубокий',
		count: 5,
	},
	{
		title: 'Личный',
		count: 2,
	},
	{
		title: 'Авто',
		count: 1,
	},
]

const MOCK_REVIEWS = [
	{
		text:
			'Отличный автомобиль, придуманный для скорости и комфорта, у каждого должен быть такой автомобиль, или период владения. Не достатков не заметил, если вовремя ухаживать за авто, проблем нет, своевременное обслуживание и самое важное качественное мало. Телевизоры назад можно было бы, советую всем отличный авто, на повседневную езду самое то. Но это не точно, не уверен, что это будет такое, но с ним все в порядке. Спасибо. Приятного дня. ',
		brand: 'Porsche',
		model: 'Cayenne Turbo S',
		body: 'CROSSOVER',
		score: 'Позитивный',
		source: 'avito',
		sourceUrl:
			'https://www.avito.ru/otzyvy_vladelcev/auto/porsche/cayenne_turbo_s/vnedorozhnik-ASgBAgICBETgtg2GmSjitg2IoSjmtg2~tyjQvA7Mk4sD',
	},
	{
		text:
			'Отличный автомобиль, придуманный для скорости и комфорта, у каждого должен быть такой автомобиль, или период владения. Не достатков не заметил, если вовремя ухаживать за авто, проблем нет, своевременное обслуживание и самое важное качественное мало. Телевизоры назад можно было бы, советую всем отличный авто, на повседневную езду самое то',
		brand: 'Porsche',
		model: 'Cayenne Turbo S',
		body: 'CROSSOVER',
		score: 'Негативный',
		source: 'auto.ru',
		sourceUrl:
			'https://www.avito.ru/otzyvy_vladelcev/auto/porsche/cayenne_turbo_s/vnedorozhnik-ASgBAgICBETgtg2GmSjitg2IoSjmtg2~tyjQvA7Mk4sD',
	},
	{
		text:
			'Отличный автомобиль, придуманный для скорости и комфорта, у каждого должен быть такой автомобиль, или период владения. Не достатков не заметил, если вовремя ухаживать за авто, проблем нет, своевременное обслуживание и самое важное качественное мало. Телевизоры назад можно было бы, советую всем отличный авто, на повседневную езду самое то',
		brand: 'Porsche',
		model: 'Cayenne Turbo S',
		body: 'CROSSOVER',
		score: 'Нейтральный',
		source: 'drom',
		sourceUrl:
			'https://www.avito.ru/otzyvy_vladelcev/auto/porsche/cayenne_turbo_s/vnedorozhnik-ASgBAgICBETgtg2GmSjitg2IoSjmtg2~tyjQvA7Mk4sD',
	},
	{
		text:
			'Отличный автомобиль, придуманный для скорости и комфорта, у каждого должен быть такой автомобиль, или период владения. Не достатков не заметил, если вовремя ухаживать за авто, проблем нет, своевременное обслуживание и самое важное качественное мало. Телевизоры назад можно было бы, советую всем отличный авто, на повседневную езду самое то, Отличный автомобиль, придуманный для скорости и комфорта, у каждого должен быть такой автомобиль, или период владения. Не достатков не заметил, если вовремя ухаживать за авто, проблем нет, своевременное обслуживание и самое важное качественное мало. Телевизоры назад можно было бы, советую всем отличный авто, на повседневную езду самое то, Отличный автомобиль, придуманный для скорости и комфорта, у каждого должен быть такой автомобиль, или период владения. Не достатков не заметил, если вовремя ухаживать за авто, проблем нет, своевременное обслуживание и самое важное качественное мало. Телевизоры назад можно было бы, советую всем отличный авто, на повседневную езду самое то, hf42hfhfj3eijfejwfioweojfwjfjpewjfjieowfjpioewjpfpjwefpjwepojf',
		brand: 'Porsche',
		model: 'Cayenne Turbo S',
		body: 'CROSSOVER',
		score: 'Нейтральный',
		source: 'avito',
		sourceUrl:
			'https://www.avito.ru/otzyvy_vladelcev/auto/porsche/cayenne_turbo_s/vnedorozhnik-ASgBAgICBETgtg2GmSjitg2IoSjmtg2~tyjQvA7Mk4sD',
	},
]

export const ReviewsPageLoaded = () => {
	return (
		<div className="loaded-reviews">
			<section className="loaded-reviews__block">
				<h3 className="loaded-reviews__block__title">Самые часто встречаемые слова</h3>
				<div className="loaded-reviews__block__tags">
					{MOCK_TAGS.map(({ title, count }) => (
						<Tag key={title} title={title} count={count} className="loaded-reviews__block__tags__tag" />
					))}
				</div>
			</section>
			<section className="loaded-reviews__block">
				<h3 className="loaded-reviews__block__title">Отзывы пользователей</h3>
				<div className="loaded-reviews__block__reviews">
					{MOCK_REVIEWS.map(({ text, brand, model, body, score, source, sourceUrl }, index) => (
						<Review
							// eslint-disable-next-line react/no-array-index-key
							key={index}
							text={text}
							brand={brand}
							model={model}
							body={body}
							score={score}
							source={source}
							sourceUrl={sourceUrl}
							tags={MOCK_TAGS}
							className="loaded-reviews__block__reviews__review"
						/>
					))}
				</div>
			</section>
		</div>
	)
}
