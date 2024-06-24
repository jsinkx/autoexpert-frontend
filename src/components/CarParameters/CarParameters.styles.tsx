import styled from 'styled-components'

export const StyledCarParameters = styled.article`
	margin-bottom: 20px;
	display: inline;

	.car-parameters {
		margin-bottom: 20px;

		&__input {
			margin-bottom: 20px;
		}

		@media (max-width: 920px) {
			&__label {
				margin-top: 0px !important;
			}

			&__input {
				margin-bottom: 20px !important;

				&:last-child {
					margin-bottom: 0px !important;
				}
			}
		}

		&__label {
			margin: 0;
			margin-top: 20px;
			margin-bottom: 7px;
			font-weight: 600;
			user-select: none;
		}

		&__info {
			width: 300px;
			margin-top: 10px;
		}

		.car-parameters__select {
		}

		.car-parameters__search {
			width: 300px;
		}
	}

	.car-parameter__error {
		margin-bottom: 20px;
		display: flex;
		align-items: center;
		font-size: 1em;
	}

	.button-apply {
		width: 300px;
	}
`
