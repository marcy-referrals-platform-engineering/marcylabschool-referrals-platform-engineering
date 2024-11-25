import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wbyojgvzddnkdiggrwsm.supabase.co'; // Replace with your Supabase URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndieW9qZ3Z6ZGRua2RpZ2dyd3NtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY4NDgyNDMsImV4cCI6MjA0MjQyNDI0M30._BNKf6Q9e7a7YEdb7MWYQmkxds51_IrFZtyY73m2i_Q'; // Replace with your Supabase anon key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);