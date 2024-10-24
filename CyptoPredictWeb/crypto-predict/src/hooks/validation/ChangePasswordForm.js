/** @format */
export default function validateChangePasswordForm(values) {
	const errors = {};

	// Validate email
	if (!values.email) {
		errors.email = 'El correo es obligatorio';
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
		errors.user_email = 'Correo no válido';
	}

	// Validate password
	if (!values.password) {
		errors.password = 'La contraseña es obligatoria';
	} else if (values.password.length < 6) {
		errors.password = 'La contraseña debe ser de al menos 6 caracteres';
	}

	// Validate password
	if (!values.confirmpassword) {
		errors.confirmpassword = 'Confirme su contraseñas';
	} else if (values.password.length < 6) {
		errors.confirmpassword = 'La contraseña debe ser de al menos 6 caracteres';
	}
	if (values.password !== values.confirmpassword) {
		errors.confirmpassword = 'Las contraseñas no coinciden';
	}

	return errors;
}
