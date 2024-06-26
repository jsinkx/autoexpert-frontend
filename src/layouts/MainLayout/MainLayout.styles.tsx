import styled from 'styled-components'

export const StyledMainLayout = styled.div`
	height: 100vh;
	display: flex;
	flex-direction: column;

	.main-layout__header {
		position: fixed;
		z-index: 9;
	}

	.main-layout__header,
	.main-layout__main-content,
	.main-layout__footer {
		padding-inline: 50px;
	}

	.main-layout__main-content {
		margin-top: 90px;
		flex: 1 0 auto;
	}
`
