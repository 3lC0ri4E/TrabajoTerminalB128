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
	const { error } = await supabase.auth.resetPasswordForEmail(email, {
		redirectTo: 'http://localhost:3000/ajustes',
	});
	return { error };
}

// Insertar noticias en la base de datos
export async function uploadnews(data) {
	const { data: news, error } = await supabase.from('news').insert(data);
	return { news, error };
}

// Obtener noticias de la base de datos
export async function getnews(currentDate) {
	const { data, error } = await supabase
		.from('news')
		.select('*')
		.gte('pubDate', currentDate);
	return { data, error };
}

// Obtener las primeras 100 noticias de la base de datos de forma descendente
export async function getNewsFromDatabase() {
	let { data, error } = await supabase
		.from('news')
		.select('*')
		.order('pubDate', { ascending: false })
		.limit(100);
	if (error) {
        console.error('Error fetching news:', error);
        return { data: null, error };
    }

    return { data, error: null };
}

// Insertar label de sentimiento y valor de probabilidad
export async function insertSentiment(created_at, label, probability) {
	const { data, error } = await supabase
		.from('analisis_fundamental')
		.insert({ created_at, label, probability });
	return { data, error };
}

export async function getLastTAnalysis() {
	let { data, error } = await supabase
		.from('analisis_tecnico')
		.select('*')
		.order('id', { ascending: false })
		.limit(1);

	if (error) {
		return { data: null, error };
	}

	if (data && data.length > 0) {
		return { data, error: null };
	}

	// Caso en que no hay registros
	return { data: null, error: null };
}

export async function saveTA(label, probability, predictedPrice, realPrice) {
	try {
		const today = new Date().toISOString().split('T')[0];
		const { data, error } = await supabase.from('analisis_tecnico').insert([
			{
				label,
				probability,
				created_at: today,
				predictedPrice,
				realPrice,
			},
		]);
		if (error) {
			return { data: null, error };
		}
		return { data, error: null };
	} catch (err) {
		return { data: null, error: err };
	}
}

// Obtener último análisis fundamental
export async function getLastFA() {
	const { data, error } = await supabase
		.from('analisis_fundamental')
		.select('*')
		.order('id', { ascending: false })
		.limit(1);

	if (error) {
		return { data: null, error };
	}

	if (data && data.length > 0) {
		return { data, error: null };
	}

	// Caso en que no hay registros
	return { data: null, error: null };
}

export async function getLastAnalisisId() {
    const { data, error } = await supabase
        .from('analisis_fundamental')
        .select('id')
        .order('created_at', { ascending: false })  // Ordenar de más reciente a más antiguo
        .limit(1);  // Solo traemos el último

    if (error) {
        console.error('Error al obtener el último análisis:', error);
        return { id: null, error };
    }

    return { id: data[0]?.id, error };  // Retornamos el id del último análisis
}

// Actualizar noticias con el último análisis
export async function updateNewsWithAnalisisId(news, analisisId) {
    const idsToUpdate = news.map(n => n.id); // Extraer los IDs de las noticias a actualizar
    const { data, error } = await supabase
        .from('news')
        .update({ analisis_id: analisisId }) // Actualizar el campo analisis_id
        .in('id', idsToUpdate); // Filtrar las noticias por ID

    if (error) {
        console.error('Error al actualizar las noticias:', error.message);
        return { data: null, error };
    }

    return { data, error };
}

export async function uploadNewsWithLastAnalisis() {
    const currentDate = new Date().toISOString().split('T')[0];
    console.log('Fecha actual:', currentDate);
    
    // Obtener el último id del análisis
    const { id: lastAnalisisId, error: analisisError } = await getLastAnalisisId();

    if (analisisError || !lastAnalisisId) {
        console.error('No se encontró un análisis para asociar las noticias');
        return { news: null, error: analisisError };
    }
    
    // Obtener las noticias más recientes de la base de datos
    const { data: news, error: newsError } = await getnews(currentDate);
    if (newsError) {
        console.error('Error al obtener las noticias de la base de datos:', newsError.message);
        return { news: null, error: newsError };
    }
    console.log('Noticias obtenidas:', news.length);

    // Actualizar analisis_id en la base de datos
    const updates = news.map(async (item) => {
        const { error } = await supabase
            .from('news')
            .update({ analisis_id: lastAnalisisId }) // Actualizamos el analisis_id
            .eq('id', item.id); // Donde el id coincide con el de la noticia

        if (error) {
            console.error(`Error al actualizar la noticia con ID ${item.id}:`, error.message);
            return null;
        }

        return item.id; // Retornamos los IDs actualizados
    });

    // Ejecutar todas las actualizaciones
    const updatedIds = await Promise.all(updates);

    // Filtrar las actualizaciones exitosas
    if (updatedIds.length === 0) {
        console.log('No se han actualizado noticias con éxito');
        return { news: null, error: null };
    }
    const successfulUpdates = updatedIds.filter((id) => id !== null);
    console.log('Noticias actualizadas con éxito:', successfulUpdates.length);

    return { news: successfulUpdates, error: null };
}