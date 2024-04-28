import {createClient} from '@supabase/supabase-js';

const supabaseUrl = 'https://znktlvfiwxosgosaumkh.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpua3RsdmZpd3hvc2dvc2F1bWtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQyNjA3NjYsImV4cCI6MjAyOTgzNjc2Nn0.AFnCIVr39VZE57rtKkmbjrfTA1-vx1W7-wD9HVhRvFM'

export const supabase = createClient(supabaseUrl, supabaseKey);