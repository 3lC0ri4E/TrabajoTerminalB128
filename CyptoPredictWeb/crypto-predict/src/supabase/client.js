/** @format */

import { createClient } from '@supabase/supabase-js';

// Acceder a las variables de entorno
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Verificar si las variables están definidas
if (!supabaseUrl) {
	throw new Error('supabaseUrl is required');
}
if (!supabaseKey) {
	throw new Error('supabaseKey is required');
}

// Crear el cliente de Supabase
export const supabase = createClient(supabaseUrl, supabaseKey);
