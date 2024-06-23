import { FC } from 'react'
import { Pie } from 'react-chartjs-2'

import { ArcElement, Chart as ChartJS, Legend, Title, Tooltip } from 'chart.js'
import type { ChartData, ChartOptions } from 'chart.js'

import { Colors } from '@shared/colors'
import { reviewsScoresMap } from '@shared/reviews-scores-map'

import { ReviewScores } from '@entities/review-scores.types'

type ChartsPagePiechartProps = {
	carName: string
	reviewsScores: ReviewScores
}

ChartJS.register(ArcElement, Tooltip, Legend, Title)

const getColorByScore = (score: string) => {
	switch (score) {
		case 'POSITIVE':
			return {
				borderColor: Colors.GREEN_RGBA,
				backgroundColor: Colors.GREEN_LIGHT_RGBA,
			}
		case 'NEGATIVE':
			return {
				borderColor: Colors.RED_RGBA,
				backgroundColor: Colors.RED_LIGHT_RGBA,
			}
		default:
			return {
				borderColor: Colors.BLUE_RGBA,
				backgroundColor: Colors.BLUE_LIGHT_RGBA,
			}
	}
}

const countPercent = (score: number, total: number) => Math.round((score / total) * 100)

export const ChartsPagePiechart: FC<ChartsPagePiechartProps> = ({ carName, reviewsScores }) => {
	const labels = Object.keys(reviewsScores).map(
		(reviewScore) =>
			`${reviewsScoresMap[reviewScore as keyof typeof reviewsScoresMap]} (${reviewsScores[reviewScore]})`,
	)

	const options: ChartOptions<'pie'> = {
		responsive: true,
		plugins: {
			title: {
				display: true,
				text: `Окрасы текста отзывов для ${carName}`,
				font: {
					size: 24,
					family: 'sans-serif',
				},
			},
			legend: {
				display: true,
			},
			tooltip: {
				callbacks: {
					label: (context) =>
						`${countPercent(
							Number(context.formattedValue),
							context.dataset.data.reduce((a, b) => a + b, 0),
						)}%`,
				},
			},
		},
	}

	const data: ChartData<'pie'> = {
		labels,
		datasets: [
			{
				label: 'Окрасы текста отзывов',
				data: Object.values(reviewsScores),
				backgroundColor: Object.keys(reviewsScores).map(
					(reviewScore) => getColorByScore(reviewScore).backgroundColor,
				),
				borderColor: Object.keys(reviewsScores).map((reviewScore) => getColorByScore(reviewScore).borderColor),
				borderWidth: 1,
			},
		],
	}

	return <Pie options={options} data={data} />
}
