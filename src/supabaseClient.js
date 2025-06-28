import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gsodycrqntvsualpckzb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdzb2R5Y3JxbnR2c3VhbHBja3piIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5NTg2NjMsImV4cCI6MjA2NjUzNDY2M30.Nm0okKQNkzWZWKppNQdnoHcb5E4sRX8f7aB6W70rNvo';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
