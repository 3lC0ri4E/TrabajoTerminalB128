/** @format */

import { supabase } from './client';

export async function signIn(email, password) {
	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	return { data, error };
}

export async function signUp(data) {
	const { user, error } = await supabase.auth.signUp({
		email: data.email,
		password: data.password,
		options: {
			data: {
				name: data.name,
				lastname: data.last_name,
				username: data.username,
				num_visita: 0,
			},
		},
	});

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

// export const resetPassword = async (email) => {

//     let { user, error } = await supabase.auth.resetPasswordForEmail(email)

//     if (error) {
//         console.error('Error resetting password:', error.message)
//         throw error
//     }

//     return user

// }

// export const updateUser = async (email, password, data) => {

//     const { user, error } = await supabase.auth.updateUser({
//         email,
//         password,
//         data
//     })

//     if (error) {
//         console.error('Error resetting password:', error.message)
//         throw error
//     }

//     return user
// }
