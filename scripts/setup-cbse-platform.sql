-- Create the cbse_purchases table
CREATE TABLE IF NOT EXISTS cbse_purchases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  class_number INTEGER NOT NULL,
  amount INTEGER NOT NULL,
  razorpay_payment_id TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_cbse_purchases_user_id ON cbse_purchases(user_id);
CREATE INDEX IF NOT EXISTS idx_cbse_purchases_status ON cbse_purchases(status);
CREATE INDEX IF NOT EXISTS idx_cbse_purchases_class_number ON cbse_purchases(class_number);

-- Enable Row Level Security
ALTER TABLE cbse_purchases ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own purchases" ON cbse_purchases
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own purchases" ON cbse_purchases
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Grant permissions
GRANT ALL ON cbse_purchases TO authenticated;
GRANT USAGE ON SCHEMA public TO authenticated;
