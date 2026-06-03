CREATE TABLE IF NOT EXISTS t_p11218885_create_site_project_.teachers (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  login TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  subject TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO t_p11218885_create_site_project_.teachers (name, login, password_hash, subject)
VALUES ('Администратор', 'admin', md5('admin123'), 'Администратор')
ON CONFLICT (login) DO NOTHING;
