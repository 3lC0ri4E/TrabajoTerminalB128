/** @format */

import { createClient } from '@supabase/supabase-js';

// Acceder a las variables de entorno
const supabaseUrl = 'https://ktblaawjnhtkogqmqhmw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0YmxhYXdqbmh0a29ncW1xaG13Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIwOTM4MTQsImV4cCI6MjAyNzY2OTgxNH0.NyBKLUCMVzJ5sP8x4GgGvccN7D6-SIJ2vgn7cnXV9xc';

// Verificar si las variables están definidas
if (!supabaseUrl) {
	throw new Error('supabaseUrl is required');
}
if (!supabaseKey) {
	throw new Error('supabaseKey is required');
}

// Crear el cliente de Supabase
export const supabase = createClient(supabaseUrl, supabaseKey);
