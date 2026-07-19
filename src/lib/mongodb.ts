import { MongoClient, type Db } from 'mongodb';

const uri = process.env.MONGODB_URI!;
let client: MongoClient | null = null;
let db: Db | null = null;

export async function getDb(): Promise<Db> {
  if (db) return db;
  if (!uri) throw new Error('MONGODB_URI is not set');

  client = new MongoClient(uri);
  await client.connect();
  db = client.db('LMSDATA');

  // Ensure indexes
  await db.collection('users').createIndex({ email: 1 }, { unique: true });

  return db;
}

// ── User types ──
export interface UserDocument {
  _id?: string;
  name: string;
  email: string;
  password: string;
  isVerified: boolean;
  otp?: string;
  otpExpiry?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export function getUsersCollection() {
  return getDb().then((d) => d.collection<UserDocument>('users'));
}