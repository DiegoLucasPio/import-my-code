
CREATE TABLE IF NOT EXISTS assessments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_name text NOT NULL,
  school_unit text NOT NULL,
  teacher_name text NOT NULL,
  assessment_date date NOT NULL DEFAULT CURRENT_DATE,
  assessment_type text DEFAULT 'initial' CHECK (assessment_type IN ('initial', 'final')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS assessment_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id uuid REFERENCES assessments(id) ON DELETE CASCADE,
  question_number integer NOT NULL CHECK (question_number >= 1 AND question_number <= 14),
  response_data jsonb DEFAULT '{}'::jsonb,
  observations text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create assessments" ON assessments FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Anyone can view assessments" ON assessments FOR SELECT TO public USING (true);
CREATE POLICY "Anyone can update assessments" ON assessments FOR UPDATE TO public USING (true) WITH CHECK (true);
CREATE POLICY "Anyone can delete assessments" ON assessments FOR DELETE TO public USING (true);

CREATE POLICY "Anyone can create responses" ON assessment_responses FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Anyone can view responses" ON assessment_responses FOR SELECT TO public USING (true);
CREATE POLICY "Anyone can update responses" ON assessment_responses FOR UPDATE TO public USING (true) WITH CHECK (true);
CREATE POLICY "Anyone can delete responses" ON assessment_responses FOR DELETE TO public USING (true);

CREATE INDEX IF NOT EXISTS idx_assessment_responses_assessment_id ON assessment_responses(assessment_id);
CREATE INDEX IF NOT EXISTS idx_assessment_responses_question_number ON assessment_responses(question_number);

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_assessments_updated_at BEFORE UPDATE ON assessments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_assessment_responses_updated_at BEFORE UPDATE ON assessment_responses FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
