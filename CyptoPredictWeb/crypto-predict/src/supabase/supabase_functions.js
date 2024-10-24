/** @format */

import { supabase } from './client';

export async function signUp(data) {
	// const { user, error } = await supabase.auth.signInWithOtp({
	// 	email: data.email,
	// 	options: {
	// 		// set this to false if you do not want the user to be automatically signed up
	// 		shouldCreateUser: false,
	// 		emailRedirectTo: 'http://localhost:3000/',
	// 	},
	// });

	// const { user, error } = await supabase.auth.signUp({
	// 	phone: '+525536733498',
	// 	password: data.password,
	// 	options: {
	// 		data: {
	// 			name: data.name,
	// 			lastname: data.last_name,
	// 			username: data.username,
	// 			num_visita: 0,
	// 		},
	// 	},
	// });

	const { user, error } = await supabase.auth.signUp({
		email: data.email,
		password: data.password,
		options: {
			data: {
				name: data.name,
				lastname: data.lastname,
				username: data.username,
				num_visita: 0,
			},
		},
	});
	console.log(data, error);
	return { user, error };
}

export async function getUser() {
	const {
		data: { user },
	} = await supabase.auth.getUser();

	return user;
}

export async function getSession() {
	const { data } = await supabase.auth.getSession();

	return data;
}

export async function signOut() {
	let { error } = await supabase.auth.signOut();
	return error;
}

// Obtener información del usuario autenticado
export const getUserInfo = async () => {
	try {
		const { data, error } = await supabase.auth.getUser();
		if (error) throw error;
		return data.user;
	} catch (error) {
		console.error('Error al obtener el usuario:', error.message);
		return null;
	}
};

// Actualizar la información del usuario
export const updateUserInfo = async (email, password, user_metadata) => {
	try {
		const { data, error } = await supabase.auth.updateUser({
			email: email || undefined, // Actualiza el email si es necesario
			password: password || undefined, // Solo actualiza la contraseña si hay una nueva
			data: user_metadata, // Actualiza los datos personalizados del usuario
		});
		if (error) throw error;
		return data;
	} catch (error) {
		console.error('Error al actualizar el usuario:', error.message);
		return null;
	}
};

export const updatePassword = async (email, password) => {
	try {
		const { data, error } = await supabase.auth.updateUser({
			email,
			password: password,
		});

		if (error) throw error;
		return data;
	} catch (error) {
		console.error('Error al actualizar el usuario:', error.message);
		return null;
	}
};

export async function signIn(email, password) {
	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});
	if (!error) {
		// console.log(data.user.user_metadata.num_visita);
		await updateUserInfo(undefined, undefined, {
			num_visita: data.user.user_metadata.num_visita + 1,
		});
	}
	return { data, error };
}
