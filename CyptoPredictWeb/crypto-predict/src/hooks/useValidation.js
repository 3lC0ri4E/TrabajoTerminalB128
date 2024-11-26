/** @format */

import { useState, useEffect, useCallback } from 'react';

const useValidation = (initialState, validate, func) => {
	const [values, saveValues] = useState(initialState);
	const [errors, saveErrors] = useState({});
	const [submitForm, saveSubmitForm] = useState(false);

	const memoizedFunc = useCallback(func, [func]);

	useEffect(() => {
		if (submitForm) {
			const noErrors = Object.keys(errors).length === 0;
			if (noErrors) {
				memoizedFunc(); 
			}
			saveSubmitForm(false);
		}
	}, [errors, memoizedFunc]); 

	const handleChange = (e) => {
		if (e && e.target) {
			const { name, value } = e.target;
			saveValues({ ...values, [name]: value });
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const validationErrors = validate(values);
		saveErrors(validationErrors);
		saveSubmitForm(true);
	};

	return {
		values,
		errors,
		submitForm,
		handleSubmit,
		handleChange,
		setValues: saveValues, // Asegúrate de exportar la función correcta
	};
};

export default useValidation;
