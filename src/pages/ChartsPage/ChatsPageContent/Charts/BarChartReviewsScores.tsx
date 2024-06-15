import { FC } from 'react'
import { Bar } from 'react-chartjs-2'

import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js'

import { Colors } from '@shared/colors'
import { reviewsScoresMap } from '@shared/reviews-scores-map'

import { ReviewScores } from '@entities/review-scores.types'

type ChartsPageBarchartProps = {
	carName: string
	reviewsScores: ReviewScores
}

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const getColorByScore = (score: string) => {
	switch (score) {
		case 'POSITIVE':
			return Colors.GREEN_BACKGROUND_COLOR
		case 'NEGATIVE':
			return Colors.RED_BACKGROUND_COLOR
		default:
			return Colors.BLUE_BACKGROUND_COLOR
	}
}

export const ChartsPageBarchart: FC<ChartsPageBarchartProps> = ({ carName, reviewsScores }) => {
	const labels = Object.keys(reviewsScores).map(
		(reviewScore) => reviewsScoresMap[reviewScore as keyof typeof reviewsScoresMap],
	)

	const options = {
		responsive: true,
		plugins: {
			legend: {
				display: false,
				position: 'top' as const,
			},
			title: {
				display: false,
				text: `Рейтинг  отзывов об автомобилях ${carName}`,
			},
		},
	}

	const data = {
		labels,
		datasets: [
			{
				data: Object.values(reviewsScores),
				backgroundColor: Object.keys(reviewsScores).map((reviewScore) => getColorByScore(reviewScore)),
			},
		],
	}

	return <Bar options={options} data={data} />
}
