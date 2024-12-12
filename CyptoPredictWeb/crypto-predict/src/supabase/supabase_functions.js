/** @format */

import { supabase } from './client';

export async function signUp(data) {
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
			email: email || undefined,
			password: password || undefined,
			data: user_metadata,
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

export async function sendResetPasswordEmail(email) {
	const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: 'http://localhost:3000/ajustes', })
	return { error };
}

// Insertar noticias en la base de datos
export async function uploadnews(data) {
	const { data: news, error } = await supabase.from('news').insert(data);
	return { news, error };
}

// Obtener noticias de la base de datos 
export async function getnews(currentDate) {
	const { data, error } = await supabase.from('news').select('*').gte('pubDate', currentDate);
	return { data, error };
}

// Insertar label de sentimiento y valor de probabilidad
export async function insertSentiment(created_at, label, probability) {
	const { data, error } = await supabase.from('analisis_fundamental').insert({ created_at, label, probability });
	return { data, error };
}
/*
// Obtener el id de analisis_fundamental
export async function getNewsAnalysisId() {
	const { data, error } = await supabase.from('analisis_fundamental').select('id');
	return { data, error };
}

// Actualizar analisis_id de noticias
export async function updateNewsAnalysisId(newsId, analisisId) {
	const { data, error } = await supabase
	  .from('news')
	  .update({ analisis_id: analisisId })
	  .eq('id', newsId);
  
	return { data, error };
}*/