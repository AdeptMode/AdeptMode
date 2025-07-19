-- Create profiles table (extends Supabase Auth)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Create payments table
CREATE TABLE IF NOT EXISTS payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  class_number INTEGER NOT NULL CHECK (class_number IN (6, 7, 8, 9, 10, 11, 12)),
  amount INTEGER NOT NULL DEFAULT 200,
  razorpay_payment_id TEXT NOT NULL UNIQUE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create chapters table with correct column names
CREATE TABLE IF NOT EXISTS chapters (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  class_number INTEGER NOT NULL CHECK (class_number IN (6, 7, 8, 9, 10, 11, 12)),
  subject TEXT NOT NULL,
  chapter_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  pdf_url TEXT,
  notes_url TEXT,
  quiz_url TEXT,
  is_free BOOLEAN DEFAULT false,
  duration TEXT DEFAULT '60 min',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(class_number, subject, chapter_number)
);

-- Insert sample chapters for Class 6 Science
INSERT INTO chapters (class_number, subject, chapter_number, title, description, is_free, duration) VALUES
(6, 'science', 1, 'Food: Where Does it Come From?', 'Understanding food sources, plants and animals as food sources, and food habits of different animals', true, '45 min'),
(6, 'science', 2, 'Components of Food', 'Nutrients in food, balanced diet, and deficiency diseases', false, '50 min'),
(6, 'science', 3, 'Fibre to Fabric', 'Plant fibres, animal fibres, and the process of making fabric', false, '55 min'),
(6, 'science', 4, 'Sorting Materials into Groups', 'Properties of materials and their classification', false, '60 min'),
(6, 'science', 5, 'Separation of Substances', 'Methods of separation like sieving, winnowing, and filtration', false, '65 min')
ON CONFLICT (class_number, subject, chapter_number) DO NOTHING;

-- Insert sample chapters for Class 7 Science
INSERT INTO chapters (class_number, subject, chapter_number, title, description, is_free, duration) VALUES
(7, 'science', 1, 'Nutrition in Plants', 'Photosynthesis, modes of nutrition, and symbiotic relationships', true, '50 min'),
(7, 'science', 2, 'Nutrition in Animals', 'Different ways animals take in food and digestion process', false, '55 min'),
(7, 'science', 3, 'Heat', 'Temperature, heat transfer, and effects of heat', false, '60 min'),
(7, 'science', 4, 'Acids, Bases and Salts', 'Properties of acids and bases, indicators, and neutralization', false, '65 min'),
(7, 'science', 5, 'Physical and Chemical Changes', 'Types of changes and their characteristics', false, '50 min')
ON CONFLICT (class_number, subject, chapter_number) DO NOTHING;

-- Insert sample chapters for Class 8 Science
INSERT INTO chapters (class_number, subject, chapter_number, title, description, is_free, duration) VALUES
(8, 'science', 1, 'Crop Production and Management', 'Agricultural practices, tools, and crop protection', true, '55 min'),
(8, 'science', 2, 'Microorganisms: Friend and Foe', 'Types of microorganisms and their uses and harmful effects', false, '60 min'),
(8, 'science', 3, 'Coal and Petroleum', 'Formation and uses of fossil fuels', false, '50 min'),
(8, 'science', 4, 'Combustion and Flame', 'Types of combustion and conditions for combustion', false, '55 min'),
(8, 'science', 5, 'Conservation of Plants and Animals', 'Deforestation, conservation methods, and protected areas', false, '65 min')
ON CONFLICT (class_number, subject, chapter_number) DO NOTHING;

-- Insert sample chapters for Class 9 Science
INSERT INTO chapters (class_number, subject, chapter_number, title, description, is_free, duration) VALUES
(9, 'science', 1, 'Matter in Our Surroundings', 'States of matter, properties, and interconversion of states', true, '60 min'),
(9, 'science', 2, 'Is Matter Around Us Pure?', 'Pure substances, mixtures, and separation techniques', false, '65 min'),
(9, 'science', 3, 'Atoms and Molecules', 'Laws of chemical combination and atomic molecular theory', false, '70 min'),
(9, 'science', 4, 'Structure of the Atom', 'Discovery of fundamental particles and atomic models', false, '65 min'),
(9, 'science', 5, 'The Fundamental Unit of Life', 'Cell theory, cell organelles, and their functions', false, '70 min')
ON CONFLICT (class_number, subject, chapter_number) DO NOTHING;

-- Insert sample chapters for Class 10 Science
INSERT INTO chapters (class_number, subject, chapter_number, title, description, is_free, duration) VALUES
(10, 'science', 1, 'Chemical Reactions and Equations', 'Types of chemical reactions and balancing equations', true, '65 min'),
(10, 'science', 2, 'Acids, Bases and Salts', 'Properties, indicators, and pH scale', false, '70 min'),
(10, 'science', 3, 'Metals and Non-metals', 'Properties, extraction, and corrosion of metals', false, '75 min'),
(10, 'science', 4, 'Life Processes', 'Nutrition, respiration, transportation, and excretion', false, '80 min'),
(10, 'science', 5, 'Control and Coordination', 'Nervous system, hormones, and plant responses', false, '75 min')
ON CONFLICT (class_number, subject, chapter_number) DO NOTHING;

-- Insert sample chapters for Class 11 Physics
INSERT INTO chapters (class_number, subject, chapter_number, title, description, is_free, duration) VALUES
(11, 'physics', 1, 'Physical World', 'Introduction to Physics and its scope in understanding nature', true, '45 min'),
(11, 'physics', 2, 'Units and Measurements', 'Fundamental and derived units, dimensional analysis, significant figures', false, '60 min'),
(11, 'physics', 3, 'Motion in a Straight Line', 'Kinematics in one dimension, velocity, acceleration, equations of motion', false, '75 min'),
(11, 'physics', 4, 'Motion in a Plane', 'Projectile motion, circular motion, relative velocity', false, '80 min'),
(11, 'physics', 5, 'Laws of Motion', 'Newton''s laws and their applications', false, '70 min')
ON CONFLICT (class_number, subject, chapter_number) DO NOTHING;

-- Insert sample chapters for Class 11 Chemistry
INSERT INTO chapters (class_number, subject, chapter_number, title, description, is_free, duration) VALUES
(11, 'chemistry', 1, 'Some Basic Concepts of Chemistry', 'Matter, atoms, molecules, mole concept, stoichiometry', true, '50 min'),
(11, 'chemistry', 2, 'Structure of Atom', 'Atomic models, quantum numbers, electronic configuration', false, '70 min'),
(11, 'chemistry', 3, 'Classification of Elements', 'Periodic table, periodic properties, chemical bonding', false, '65 min'),
(11, 'chemistry', 4, 'Chemical Bonding and Molecular Structure', 'Ionic and covalent bonding, VSEPR theory', false, '75 min'),
(11, 'chemistry', 5, 'States of Matter', 'Gaseous and liquid states, intermolecular forces', false, '60 min')
ON CONFLICT (class_number, subject, chapter_number) DO NOTHING;

-- Insert sample chapters for Class 11 Mathematics
INSERT INTO chapters (class_number, subject, chapter_number, title, description, is_free, duration) VALUES
(11, 'mathematics', 1, 'Sets', 'Introduction to set theory, operations on sets, Venn diagrams', true, '40 min'),
(11, 'mathematics', 2, 'Relations and Functions', 'Types of relations, functions, domain and range', false, '55 min'),
(11, 'mathematics', 3, 'Trigonometric Functions', 'Trigonometry, identities, equations, inverse functions', false, '70 min'),
(11, 'mathematics', 4, 'Principle of Mathematical Induction', 'Proof by induction method', false, '45 min'),
(11, 'mathematics', 5, 'Complex Numbers and Quadratic Equations', 'Algebra of complex numbers', false, '65 min')
ON CONFLICT (class_number, subject, chapter_number) DO NOTHING;

-- Insert sample chapters for Class 12 Physics
INSERT INTO chapters (class_number, subject, chapter_number, title, description, is_free, duration) VALUES
(12, 'physics', 1, 'Electric Charges and Fields', 'Coulomb''s law, electric field, and Gauss''s law', true, '70 min'),
(12, 'physics', 2, 'Electrostatic Potential and Capacitance', 'Electric potential, capacitors, and energy storage', false, '75 min'),
(12, 'physics', 3, 'Current Electricity', 'Ohm''s law, electrical circuits, and Kirchhoff''s laws', false, '80 min'),
(12, 'physics', 4, 'Moving Charges and Magnetism', 'Magnetic field, force on moving charges, and magnetic dipole', false, '85 min'),
(12, 'physics', 5, 'Magnetism and Matter', 'Magnetic properties of materials and Earth''s magnetism', false, '70 min')
ON CONFLICT (class_number, subject, chapter_number) DO NOTHING;

-- Insert sample chapters for Class 12 Chemistry
INSERT INTO chapters (class_number, subject, chapter_number, title, description, is_free, duration) VALUES
(12, 'chemistry', 1, 'The Solid State', 'Crystal lattices, unit cells, and defects in solids', true, '65 min'),
(12, 'chemistry', 2, 'Solutions', 'Types of solutions, concentration terms, and colligative properties', false, '70 min'),
(12, 'chemistry', 3, 'Electrochemistry', 'Electrochemical cells, electrode potential, and electrolysis', false, '75 min'),
(12, 'chemistry', 4, 'Chemical Kinetics', 'Rate of reaction, factors affecting rate, and reaction mechanisms', false, '80 min'),
(12, 'chemistry', 5, 'Surface Chemistry', 'Adsorption, catalysis, and colloids', false, '65 min')
ON CONFLICT (class_number, subject, chapter_number) DO NOTHING;

-- Insert sample chapters for Class 12 Mathematics
INSERT INTO chapters (class_number, subject, chapter_number, title, description, is_free, duration) VALUES
(12, 'mathematics', 1, 'Relations and Functions', 'Types of functions, inverse functions, and binary operations', true, '60 min'),
(12, 'mathematics', 2, 'Inverse Trigonometric Functions', 'Properties and graphs of inverse trigonometric functions', false, '55 min'),
(12, 'mathematics', 3, 'Matrices', 'Types of matrices, operations, and determinants', false, '70 min'),
(12, 'mathematics', 4, 'Determinants', 'Properties of determinants and solving linear equations', false, '65 min'),
(12, 'mathematics', 5, 'Continuity and Differentiability', 'Limits, continuity, and derivatives', false, '80 min')
ON CONFLICT (class_number, subject, chapter_number) DO NOTHING;

-- Create storage bucket for CBSE content
INSERT INTO storage.buckets (id, name, public) VALUES ('cbse-content', 'cbse-content', false)
ON CONFLICT (id) DO NOTHING;

-- Enable Row Level Security
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for payments table
DROP POLICY IF EXISTS "Users can view their own payments" ON payments;
CREATE POLICY "Users can view their own payments" ON payments
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own payments" ON payments;
CREATE POLICY "Users can insert their own payments" ON payments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for chapters table
DROP POLICY IF EXISTS "Anyone can view chapters" ON chapters;
CREATE POLICY "Anyone can view chapters" ON chapters
  FOR SELECT USING (true);

-- RLS Policies for profiles table
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Storage policies
DROP POLICY IF EXISTS "Authenticated users can view files" ON storage.objects;
CREATE POLICY "Authenticated users can view files" ON storage.objects
  FOR SELECT USING (auth.role() = 'authenticated');

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
