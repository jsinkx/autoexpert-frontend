import styled from 'styled-components'

import { Colors } from '@shared/colors'

export const StyledReviewsPage = styled.div`
	margin-bottom: 20px;

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

			@media (max-height: 860px) {
				position: relative !important;
				top: 0 !important;
			}

			&__article-car-parameters {
				display: inline-block;
				justify-content: center;
				flex-direction: column;
				margin-bottom: 20px;
			}

			&__article-reviews-settings {
			}

			@media (max-width: 920px) {
				position: relative;
				top: 0;

				&__article-car-parameters,
				&__article-reviews-settings {
					margin-bottom: 30px;
					display: block;
					flex-direction: column;
					justify-content: center;
				}
			}
		}

		.section-reviews {
			width: 100%;
			margin-inline: 8%;

			@media (max-width: 1640px) {
				margin-inline: 3%;
			}

			@media (max-width: 920px) {
				margin-inline: 0;

				&__title {
					font-size: 1.3em !important;
					text-align: center;
				}

				/* &__paragraph--step-info {
					flex-direction: column;
					font-size: 1.05em !important;

					&__emoji {
						width: 60px;
						height: 60px;
						margin-right: 0 !important;
						margin-bottom: 15px;
					}
				} */
			}

			&__title {
				margin: 0;
				font-size: 1.7em;
			}

			// ReviewsPageInfo

			&__paragraph--step-info {
				margin-block: 20px;
				display: flex;
				align-items: center;
				font-size: 1.3em;

				@media (max-width: 920px) {
					justify-content: center;
				}

				&__emoji {
					margin-right: 10px;
				}
			}

			&__image-site-sources {
				width: 700px;
				margin-top: 60px;
				margin-left: 250px;
				display: flex;
				justify-content: center;
				user-select: none;
				pointer-events: none;

				@media (max-width: 1550px) {
					width: 600px;
					margin-left: 130px;
				}

				@media (max-width: 1270px) {
					width: 500px;
					margin-left: 100px;
				}

				@media (max-width: 1100px) {
					width: 400px;
					margin-top: 35px;
					margin-left: 100px;
				}

				@media (max-width: 980px) {
					width: 350px;
					margin-left: 90px;
				}

				@media (max-width: 920px) {
					width: 350px;
					margin-block: 40px;
					margin-inline: auto;
				}

				@media (max-width: 510px) {
					width: 100%;
				}
			}

			// Loader

			&__loader {
				display: flex;
				justify-content: center;
				margin-block: 30px;

				@media (max-width: 920px) {
					margin-top: 0px;
				}
			}

			// ReviewsPageLoaded

			.reviews-loaded {
				@media (max-width: 920px) {
					&__block {
						&__title {
							text-align: center;
						}

						&__tags {
							&__tag {
								margin-inline: auto;
							}
						}

						&__reviews {
							&__review {
								margin-inline: auto;
							}
						}
					}
				}

				&__pagination {
					display: inline-flex;
					justify-content: center;
					width: 90%;
					margin-inline: auto; // FIXME: bad, need to change for centering inside block of content
					margin-bottom: 20px;

					@media (max-width: 920px) {
						width: 100%;
						margin-inline: 0;
						display: flex;
						justify-content: center;
					}
				}

				&__block {
					margin-bottom: 20px;

					&__title {
						display: flex;
						align-items: center;
						font-size: 1.65em;
						margin-bottom: 12px;

						@media (max-width: 920px) {
							flex-direction: column;
						}

						&__text {
							margin: 0;
							font-size: 1em;
						}
					}

					&__title__breadcrumbs,
					&__parameters__breadcrumbs {
						margin-left: 10px;
						transition: all 0.2s ease-in-out;
						user-select: none;

						&__breadcrumb {
							cursor: pointer;
							opacity: 0.7;

							&:hover {
								text-decoration: underline;
							}
						}

						.active {
							color: ${Colors.BLUE};
							cursor: auto;
							opacity: 1;

							&:hover {
								text-decoration: none;
							}
						}
					}

					&__parameters {
						margin-block: -5px 10px;
						display: flex;
						align-items: center;
						user-select: none;

						@media (max-width: 920px) or (max-height: 860px) {
							flex-direction: column;
						}
					}

					&__tags {
						width: 90%;
						max-height: 300px;
						display: flex;
						justify-content: left;
						flex-wrap: wrap;
						overflow-y: auto;

						@media (max-width: 920px) or (max-height: 860px) {
							width: 100%;
							justify-content: flex-start;

							&__tag {
								margin-inline: 0 !important;
								margin-right: 8px !important;
								font-size: 0.95em !important;
							}
						}

						&__tag {
							margin-right: 20px;
							margin-bottom: 15px;
							cursor: pointer;
							transition: all 0.2s ease-in-out;
							opacity: 0.37;

							&--active {
								opacity: 1;
								border: none;
							}

							&:hover {
								opacity: 0.75;
							}
						}
					}

					&__reviews {
						&__review {
							width: 90%;
							margin-bottom: 40px;

							@media (max-width: 920px) or (max-height: 860px) {
								width: 100%;
								font-size: 0.9em;
							}
						}
					}
				}
			}
		}

		// ReviewsPageError
		.reviews-error {
			&__alert {
				display: flex;
				align-items: center;
			}
		}
	}
`
