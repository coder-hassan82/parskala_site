import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://hlwzkqxingaysobvysci.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhsd3prcXhpbmdheXNvYnZ5c2NpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk4NjI3MjcsImV4cCI6MjA1NTQzODcyN30.2KsJlvV1NA2HFa9qNdNQ3QA8aofHEbwpQv0p7IbP1qQ";
export const supabase = createClient(supabaseUrl, supabaseKey);
