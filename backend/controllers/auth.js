import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {

  //VERFICARE EXISTENTA USER
  const q = "SELECT * FROM users WHERE email = ? OR username = ?"

  db.query(q, [req.body.email, req.body.username], (err, data) => {
    if (err) return res.json(err);
    if (data.length) return res.status(409).json("Utilizatorul este deja existent!");

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);


    const q = "INSERT INTO users (`username`, `email`, `password`, `profilePic`, `name`, `country`, `adress`, `phone`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [
      req.body.username,
      req.body.email,
      hash,
      req.body.profilePic, 
      req.body.name,
      req.body.country,
      req.body.adress,
      req.body.phone,
    ];
    db.query(q, values, (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      return res.status(200).json("Utilizatorul a fost creat.");
    });
  });

};

export const login = (req, res) => {
  // VERIFICARE USER
  const q = "SELECT * FROM users WHERE username = ?";

  db.query(q, [req.body.username, req.body.password], (err, data) => {
    if (err) return res.json(err);
    if (data.length === 0) return res.status(404).json("Nume de utilizator sau parola gresita !")

     //Verificare parola
     const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!isPasswordCorrect)
      return res.status(400).json("Username sau parola gresita!");

    const token = jwt.sign({ id: data[0].id }, "jwtkey");
    const { password, ...other } = data[0];

    res.cookie("access_token", token, {
      httpOnly: true,
    }).status(200).json(other);
  });
};

export const logout = (req, res) => {

  res.clearCookie("access_token", {
    sameSite: "none",
    secure: true
  }).status(200).json("Utilizatorul a fost deconectat.")

};  
