import { ComponentPropsWithoutRef, FC } from 'react'
import WordCloud from 'react-d3-cloud'

import { scaleOrdinal } from 'd3-scale'
import { schemeCategory10 } from 'd3-scale-chromatic'

import { WordcloudWord } from '@entities/wordcloud-word.types'

import { StyledWordcloud } from './Wordcloud.styles'

export interface WordData {
	text: string
	value: number
}

const schemeCategory10ScaleOrdinal = scaleOrdinal(schemeCategory10)

type WordcloudProps = {
	words: WordcloudWord[]
} & ComponentPropsWithoutRef<'div'>

export const Wordcloud: FC<WordcloudProps> = ({ words: _words, ...props }) => {
	// Something goes wrong after give words
	const words = _words.map(({ text, value }) => ({ text, value }))

	return (
		<StyledWordcloud {...props}>
			<WordCloud
				data={words}
				width={400}
				height={300}
				font="sans-serif"
				fontWeight="bold"
				fontSize={(word) => 10 * word.value}
				spiral="archimedean"
				rotate={(word) => word.value * 360}
				fill={(_: any, i: string) => schemeCategory10ScaleOrdinal(i)}
			/>
		</StyledWordcloud>
	)
}
