import styled from 'styled-components'

export const StyledChartsPage = styled.div`
	.page__title {
		margin-top: 0;
		font-size: 2em;

		@media (max-width: 920px) {
			text-align: center;
			font-size: 1.5em;
		}
	}

	.page__content {
		display: flex;

		@media (max-width: 920px) {
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.article-car-parameters {
				margin-right: 0 !important;
				margin-bottom: 90px;
				display: flex;
				flex-direction: column;
				justify-content: center;
				position: relative !important;
				top: 0 !important;
			}
		}

		.section-settings {
			height: 100%;
			position: sticky;
			top: 80px;

			&__article-car-parameters {
				display: inline-block;
				justify-content: center;
				flex-direction: column;
				margin-bottom: 20px;
			}

			&__article-reviews-settings {
			}

			@media (max-width: 920px) or (max-height: 860px) {
				position: relative;
				top: 0;

				&__article-car-parameters,
				&__article-settings {
					margin-bottom: 30px;
					display: block;
					flex-direction: column;
					justify-content: center;
				}
			}
		}

		.section-chart {
			width: 100%;
			min-height: 400px;
			margin-inline: 10%;

			.chart-loading {
				width: 100%;
				height: 100%;
			}

			@media (max-width: 920px) {
				width: 100%;
				min-height: initial;

				.chart-loading {
					width: 400px;
					height: 300px;
				}
			}

			@media (max-width: 640px) {
				.chart-loading {
					width: 300px;
				}
			}

			.section-chart__wordcloud {
				width: 1000px;

				@media (max-width: 1600px) {
					width: 900px;
					height: 600px;
				}

				@media (max-width: 1430px) {
					width: 700px;
					height: 500px;
					margin-top: 7%;
				}

				@media (max-width: 1260px) {
					width: 600px;
				}

				@media (max-width: 1100px) {
					height: 400px;
				}

				@media (max-width: 920px) {
					margin-top: 0;
				}

				@media (max-width: 523px) {
					width: 300px;
					height: 250px;
				}
			}
		}

		.section-avg-car-scores {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			margin-inline: 10%;
			margin-top: 40px;

			&__avg-car-score {
				width: 70%;
				min-width: 400px;
				margin-bottom: 30px;

				@media (max-width: 920px) {
					min-width: 300px;
					margin-inline: auto;
				}
			}
		}

		.section-reviews-scores {
			width: 30%;
			margin-inline: auto;

			@media (max-width: 920px) {
				width: 100%;
			}
		}

		.section-indicators-comparison {
			margin-top: 40px;
			display: flex;

			&__item {
				width: 70%;
				margin-inline: 20px;
			}

			@media (max-width: 920px) {
				flex-direction: column;

				&__item {
					width: 100%;
					margin-bottom: 20px;
					margin-inline: auto !important;
					font-size: 0.87em !important;
				}
			}

			&__alert {
				width: 100%;
				height: 10%;
			}
		}
	}
`
