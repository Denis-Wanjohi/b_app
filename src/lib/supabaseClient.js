import { createClient } from '@supabase/supabase-js'

export const  supabase = createClient('https://sedfqhfrwrtnpaikvevb.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNlZGZxaGZyd3J0bnBhaWt2ZXZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAzMjAzMDcsImV4cCI6MjA0NTg5NjMwN30.ZVx9Y_ULw6HbXU-3GFAw1ggGc4ACxodRBvK2rIjTtok')