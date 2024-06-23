import styled from 'styled-components'

export const StyledAddReviewPage = styled.div`
	.page__title {
		margin-top: 0;
		display: flex;
		align-items: center;
		font-size: 2em;

		@media (max-width: 1250px) {
			justify-content: center;
			text-align: center;
		}

		@media (max-width: 360px) {
			font-size: 1.8em;
		}
	}

	.page__content {
		margin-bottom: 20px;

		@media (max-width: 1250px) {
			display: flex;
			flex-direction: column;
			align-items: center;
		}

		@media (max-width: 600px) {
			width: 100%;
		}
	}

	.page__alert {
		margin-block: 20px;

		@media (max-width: 1250px) {
			width: 62%;
			margin-inline: auto;
		}

		@media (max-width: 600px) {
			width: 90%;
		}
	}

	.add-review__car-parameters {
		width: 65%;
		margin-bottom: 30px;
		display: flex;
		justify-content: space-between;

		&__input {
			width: 300px;

			@media (max-width: 1640px) {
				width: 250px;
			}

			@media (max-width: 1440px) {
				width: 200px;
			}
		}

		@media (max-width: 1140px) {
			flex-direction: column;
			align-items: center;

			&__input {
				width: 100%;
				margin-bottom: 20px;
			}
		}

		@media (max-width: 600px) {
			width: 100%;
		}
	}

	.add-review__review-text {
		width: 65%;
		margin-bottom: 30px;

		@media (max-width: 600px) {
			width: 100%;
		}
	}

	.add-review__link-text {
		width: 65%;

		&__input {
		}

		&__info {
			margin-block: 10px 20px;
		}

		@media (max-width: 600px) {
			width: 100%;
		}
	}
`
