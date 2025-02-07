export const connection: Connection = {
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'postgres',
};

export type Connection = {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
};
