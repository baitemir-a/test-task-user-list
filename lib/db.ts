import sqlite3 from 'sqlite3';

// Initialize in-memory database
let db: sqlite3.Database | null = null;

if (!db) {
  db = new sqlite3.Database(':memory:');
  db.serialize(() => {
    db!.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        age INTEGER NOT NULL
      )
    `);
    // Seed initial data
    db!.run("INSERT INTO users (name, email, age) VALUES ('John Doe', 'john@example.com', 30)");
    db!.run("INSERT INTO users (name, email, age) VALUES ('Jane Smith', 'jane@example.com', 25)");
  });
}

// CRUD functions
export async function getUsers(): Promise<any[]> {
  return new Promise((resolve, reject) => {
    db!.all('SELECT * FROM users', [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

export async function getUserById(id: string): Promise<any> {
  return new Promise((resolve, reject) => {
    db!.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

export async function createUser(name: string, email: string, age: number): Promise<any> {
  return new Promise((resolve, reject) => {
    db!.run(
      'INSERT INTO users (name, email, age) VALUES (?, ?, ?)',
      [name, email, age],
      function (err) {
        if (err) reject(err);
        else resolve({ id: this.lastID, name, email, age });
      }
    );
  });
}

export async function updateUser(id: string, name: string, email: string, age: number): Promise<any> {
  return new Promise((resolve, reject) => {
    db!.run(
      'UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?',
      [name, email, age, id],
      function (err) {
        if (err) reject(err);
        else resolve({ id, name, email, age });
      }
    );
  });
}

export async function deleteUser(id: string): Promise<{ id: string }> {
  return new Promise((resolve, reject) => {
    db!.run('DELETE FROM users WHERE id = ?', [id], function (err) {
      if (err) reject(err);
      else resolve({ id });
    });
  });
}

export async function getUserByEmail(email: string): Promise<any> {
  return new Promise((resolve, reject) => {
    db!.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}