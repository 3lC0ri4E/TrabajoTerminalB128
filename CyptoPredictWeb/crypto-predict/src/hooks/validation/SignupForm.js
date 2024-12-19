/** @format */
export default function validateSignupForm(values) {
	const errors = {};

	// Validate first name
	if (!values.name) {
		errors.name = 'El nombre es obligatorio';
	} else if (values.name.trim().length < 2) {
		errors.name = 'El nombre debe tener al menos 2 caracteres';
	} else if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(values.name)) {
		errors.name = 'El nombre solo puede contener letras y espacios';
	}

	// Validate last name
	if (!values.lastname) {
		errors.lastname = 'El apellido es obligatorio';
	} else if (values.lastname.trim().length < 2) {
		errors.lastname = 'El apellido debe tener al menos 2 caracteres';
	} else if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(values.lastname)) {
		errors.lastname = 'El apellido solo puede contener letras y espacios';
	}

	// Validate username
	if (!values.username) {
		errors.username = 'El nombre de usuario es obligatorio';
	} else if (values.username.trim().length < 4) {
		errors.username = 'El nombre de usuario debe tener al menos 4 caracteres';
	} else if (!/^[a-zA-Z0-9._]+$/.test(values.username)) {
		errors.username =
			'El nombre de usuario solo puede contener letras, números, puntos y guiones bajos';
	}

	// Validate email
	if (!values.email) {
		errors.email = 'El correo es obligatorio';
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
		errors.email = 'Correo no válido';
	}

	// Validate password
	if (!values.password) {
		errors.password = 'La contraseña es obligatoria';
	} else if (values.password.length < 8) {
		errors.password = 'La contraseña debe ser de al menos 8 caracteres';
	} else if (
		!/(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(
			values.password
		)
	) {
		errors.password =
			'La contraseña debe contener al menos una letra mayúscula, una minúscula, un número y un carácter especial';
	}

	// Validate confirm password
	if (!values.confirmpassword) {
		errors.confirmpassword = 'Confirme su contraseña';
	} else if (values.confirmpassword !== values.password) {
		errors.confirmpassword = 'Las contraseñas no coinciden';
	}

	return errors;
}
