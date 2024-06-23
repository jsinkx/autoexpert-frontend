import { ChangeEventHandler, useState } from 'react'

export const useInput = (initialValue = '') => {
	const [value, setValue] = useState(initialValue)

	const handleChangeValue: ChangeEventHandler<HTMLInputElement> = (event) => {
		setValue(event.target.value)
	}

	const handleResetValue = () => setValue(initialValue)

	return { value, onChange: handleChangeValue, reset: handleResetValue }
}
