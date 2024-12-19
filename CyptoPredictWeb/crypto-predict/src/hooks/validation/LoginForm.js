/** @format */

export default function validateLoginForm(
	values,
	isForgotPasswordMode = false
) {
	const errors = {};

	// Validar email
	if (!values.email) {
		errors.email = 'El correo es obligatorio';
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
		errors.email = 'El correo debe tener un formato válido';
	}

	// Validar password solo si no está en modo "Olvidé mi Contraseña"
	if (!isForgotPasswordMode) {
		if (!values.password) {
			errors.password = 'La contraseña es obligatoria';
		} else if (values.password.length < 6) {
			errors.password = 'La contraseña debe tener al menos 6 caracteres';
		} else if (
			!/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(
				values.password
			)
		) {
			errors.password =
				'La contraseña debe incluir al menos una letra mayúscula, una minúscula, un número y un carácter especial';
		}
	}

	return errors;
}
