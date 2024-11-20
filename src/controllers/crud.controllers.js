import { sql, getConnection } from "../database/connection.js";

export const createCRUD = async (req, res) => {
  try {
    const { NOMBRE, APELLIDO, EDAD, SEXO, FECHA_NACIMIENTO } = req.body;

    const pool = await getConnection();

    const result = await pool
      .request()
      .input("NOMBRE", sql.NVarChar(50), NOMBRE)
      .input("APELLIDO", sql.NVarChar(50), APELLIDO)
      .input("EDAD", sql.TinyInt, EDAD)
      .input("SEXO", sql.NChar(1), SEXO)
      .input("FECHA_NACIMIENTO", sql.Date, FECHA_NACIMIENTO)
      .query(
        "INSERT INTO CRUD (NOMBRE, APELLIDO, EDAD, SEXO, FECHA_NACIMIENTO) VALUES (@NOMBRE, @APELLIDO, @EDAD, @SEXO, @FECHA_NACIMIENTO);" +
          " SELECT SCOPE_IDENTITY() AS ID_CRUD"
      );
    res.json({
      ID: result.recordset[0].ID_CRUD,
      NOMBRE,
      APELLIDO,
      EDAD,
      SEXO,
      FECHA_NACIMIENTO,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getTodoCRUD = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .query(
        "SELECT ID_CRUD, NOMBRE, APELLIDO, EDAD, SEXO, FECHA_NACIMIENTO FROM CRUD"
      );
    res.json(result.recordset);
    // console.log(res);
    //console.log(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getUnCRUD = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("ID", req.params.id_crud)
      .query(
        "SELECT ID_CRUD, NOMBRE, APELLIDO, EDAD, SEXO, FECHA_NACIMIENTO FROM CRUD WHERE ID_CRUD = @ID"
      );
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const updateCRUD = async (req, res) => {
  const { NOMBRE, APELLIDO, EDAD, SEXO, FECHA_NACIMIENTO } = req.body;
  if (
    NOMBRE == null ||
    APELLIDO == null ||
    EDAD == null ||
    SEXO == null ||
    FECHA_NACIMIENTO == NULL
  ) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }

  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("ID", sql.Int, req.params.id_crud)
      .input("NOMBRE", sql.NVarChar(50), NOMBRE)
      .input("APELLIDO", sql.NVarChar(50), APELLIDO)
      .input("EDAD", sql.TinyInt, EDAD)
      .input("SEXO", sql.NChar(1), SEXO)
      .input("FECHA_NACIMIENTO", sql.Date, FECHA_NACIMIENTO)
      .query(
        "UPDATE CRUD SET NOMBRE = @NOMBRE, APELLIDO = @APELLIDO, EDAD = @EDAD, SEXO = @SEXO, FECHA_NACIMIENTO = @FECHA_NACIMIENTO WHERE ID_CRUD = @ID"
      );
    if (result.rowsAffected[0] === 0) {
      return res.sendStatus(404);
    }

    res.json({
      ID: req.params.id_crud,
      NOMBRE,
      APELLIDO,
      EDAD,
      SEXO,
      FECHA_NACIMIENTO,
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const deleteCRUD = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("ID", req.params.id_crud)
      .query("DELETE FROM CRUD WHERE ID_CRUD = @ID");

    if (result.rowsAffected[0] === 0) return res.sendStatus(404);

    return res.sendStatus(204);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
