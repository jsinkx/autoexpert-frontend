import styled from 'styled-components'

export const StyledChartsPage = styled.div`
	.page__title {
		margin-top: 0;
		font-size: 2em;

		@media (max-width: 920px) {
			text-align: center;
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

					button {
						width: 100%; // FIXME: bad, need to add className for MUI Button
					}
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
				width: initial;
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
			display: flex;
			justify-content: center;

			&__barchart {
				width: 90%;
				min-width: 400px;
				margin-top: 40px;
			}
		}

		.section-indicators-comparison {
			margin-top: 40px;

			&__items {
				display: flex;
				justify-content: center;

				&__item {
					width: 70%;
					margin-left: 20px;
				}
			}
		}
	}
`
