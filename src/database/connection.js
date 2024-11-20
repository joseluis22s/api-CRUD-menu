import sql from "mssql";

const dbSettings = {
  user: "loginJose",
  password: "loginJose12345",
  server: "localhost",
  database: "dbJose",
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

export const getConnection = async () => {
  try {
    const pool = await sql.connect(dbSettings);
    return pool;
  } catch (error) {
    console.error(error);
  }
};

export { sql };
