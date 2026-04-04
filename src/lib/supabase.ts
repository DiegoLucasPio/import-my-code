import { supabase } from "@/integrations/supabase/client";

export { supabase };

export type Assessment = {
  id: string;
  student_name: string;
  school_unit: string;
  teacher_name: string;
  assessment_date: string;
  assessment_type: string | null;
  created_at: string | null;
  updated_at: string | null;
};

export type AssessmentResponse = {
  id: string;
  assessment_id: string | null;
  question_number: number;
  response_data: Record<string, unknown>;
  observations: string | null;
  created_at: string | null;
  updated_at: string | null;
};
