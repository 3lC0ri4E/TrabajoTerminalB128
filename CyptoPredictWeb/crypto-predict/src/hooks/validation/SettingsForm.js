/** @format */
export default function validateSettingsForm(values) {
	const errors = {};

	// Validate first name
	if (!values.name) {
		errors.name = 'El nombre es obligatorio';
	}
	// Validate last name
	if (!values.lastname) {
		errors.lastname = 'El apellido es obligatorio';
	}
	// Validate username
	if (!values.username) {
		errors.username = 'El nombre de usuario es obligatorio';
	}

	// Validate email
	if (!values.email) {
		errors.email = 'El correo es obligatorio';
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
		errors.user_email = 'Correo no válido';
	}
	return errors;
}
