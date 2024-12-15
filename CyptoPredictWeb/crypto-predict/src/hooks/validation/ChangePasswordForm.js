/** @format */
export default function validateChangePasswordForm(values) {
	const errors = {};

	// Validar email
	if (!values.email) {
		errors.email = 'El correo es obligatorio';
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
		errors.email = 'El correo debe tener un formato válido';
	}

	// Validar nueva contraseña
	if (!values.password) {
		errors.password = 'La nueva contraseña es obligatoria';
	} else if (values.password.length < 8) {
		errors.password = 'La contraseña debe tener al menos 8 caracteres';
	} else if (
		!/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(
			values.password
		)
	) {
		errors.password =
			'La contraseña debe incluir al menos una letra mayúscula, una minúscula, un número y un carácter especial';
	}

	// Validar confirmación de la contraseña
	if (!values.confirmpassword) {
		errors.confirmpassword = 'Debe confirmar la nueva contraseña';
	} else if (values.password !== values.confirmpassword) {
		errors.confirmpassword = 'Las contraseñas no coinciden';
	}

	return errors;
}
