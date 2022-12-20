import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://lupdgpqmracbzggexnys.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx1cGRncHFtcmFjYnpnZ2V4bnlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzE0NTU5NDYsImV4cCI6MTk4NzAzMTk0Nn0.utYaWc5Tp59Y8R_QMbFo_zzFC5YZZy58Nxjxwgqw-50"

const supabase = createClient(supabaseUrl, supabaseAnonKey)
export default supabase