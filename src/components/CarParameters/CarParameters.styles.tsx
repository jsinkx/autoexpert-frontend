import styled from 'styled-components'

export const StyledCarParameters = styled.article`
	margin-bottom: 20px;
	display: inline;
	/* flex-direction: column;
	align-items: center; */
	/* border: 1px solid red; */

	.car-parameters {
		margin-bottom: 20px;

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

		.car-parameters__select {
		}

		.car-parameters__search {
			width: 300px;
		}
	}
`
