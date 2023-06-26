import express from "express";
import authRoutes from"./routes/auth.js"
import userRoutes from"./routes/users.js"
import cookieParser from "cookie-parser";
import cors from "cors"
import { db } from "./db.js";
import multer from "multer";
import moment from "moment";





const app = express()
app.use(express.json());
app.use(cors())
app.use(cookieParser());
app.use("/backend/users", userRoutes)
app.use("/backend/auth", authRoutes)
app.use(express.static('public'));

app.get("/", (req, res) => {
  res.json("Bine ai venit la AdminAssist!");
});

app.get("/users", (req, res) => {
  const q = "SELECT * FROM users";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.delete("/users/:id", (req, res) => {
  const userId = req.params.id;
  const q = " DELETE FROM users WHERE id = ? ";

  db.query(q, [userId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put("/users/:id", (req, res) => {
  const userId = req.params.id;
  const q = "UPDATE users SET `username`= ?, `email`= ?,  `country`= ?, `adress`= ?,  `phone`= ? WHERE id = ?";

  const values = [
    req.body.username,
    req.body.email,
    req.body.country,
    req.body.adress,
    req.body.phone,
  ];

  db.query(q, [...values,userId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});


app.get("/posts", (req, res) => {
  const q = "SELECT * FROM posts";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});



app.post("/posts", (req, res) => {
  const q = "INSERT INTO posts(`title`, `desc`,  `cover`) VALUES (?)";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.cover,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.delete("/posts/:id", (req, res) => {
  const postId = req.params.id;
  const q = " DELETE FROM posts WHERE id = ? ";

  db.query(q, [postId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put("/posts/:id", (req, res) => {
  const postId = req.params.id;
  const q = "UPDATE posts SET `title`= ?, `desc`= ?,  `cover`= ? WHERE id = ?";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.cover,
  ];

  db.query(q, [...values,postId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.post("/contact", (req, res) => {
  const q = "INSERT INTO contact(`name`, `email`,  `departament`, `locatie`, `subiect`,  `mesaj`) VALUES (?)";

  const values = [
    req.body.name,
    req.body.email,
    req.body.departament,
    req.body.locatie,
    req.body.subiect,
    req.body.mesaj,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.post("/sanatate", (req, res) => {
  const q = "INSERT INTO sanatate (`nume`, `tipangajare`, `departament`, `titlu`, `tipconcediu`, `date`, `dataintoarcere`, `documente`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  const values = [
    req.body.nume,
    req.body.tipangajare,
    req.body.departament,
    req.body.titlu,
    req.body.tipconcediu,
    req.body.date,
    req.body.dataintoarcere,
    req.body.documente,
  ];
  db.query(q, values, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.status(200).json({ success: true });
  });
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/upload');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post('/backend/upload', upload.single('file'), function (req, res) {
  const file = req.file;
  console.log(file.filename);
  res.status(200).json(file.filename);
});

app.put("/backend/upload",  upload.single('file'), function (req, res) {
  const file = req.file;
  console.log(file.filename);
  res.status(200).json(file.filename);
});

app.get("/tranzactii", (req, res) => {
  const q = "SELECT * FROM tranzactii ";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/tranzactii", (req, res) => {
  const q = "INSERT INTO tranzactii (`icon`, `produs`, `client`, `data`, `cantitate`, `plata`, `status`) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const values = [
    req.body.icon,
    req.body.produs,
    req.body.client,
    req.body.data,
    req.body.cantitate,
    req.body.plata,
    req.body.status,
  ];
  db.query(q, values, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.status(200).json({ success: true });
  });
});

app.delete("/tranzactii/:id", (req, res) => {
  const tranzactiiId = req.params.id;


  if (isNaN(tranzactiiId)) {
    return res.status(400).json({ error: "Invalid transaction ID." });
  }

  const q = "DELETE FROM tranzactii WHERE id = ?";

  db.query(q, [tranzactiiId], (err, data) => {
    if (err) {
      console.error("Error deleting transaction:", err);
      return res.status(500).json({ error: "Failed to delete transaction." });
    }

    return res.json(data);
  });
});

app.put("/tranzactii/:id", (req, res) => {
  const tranzactiiId = req.params.id;
  const q = "UPDATE tranzactii SET `icon`= ?,  `produs`= ?,  `client`= ?, `data`= ?, `cantitate`= ?,  `plata`= ?,  `status`= ? WHERE id = ?";

  const values = [
    req.body.icon,
    req.body.produs,
    req.body.client,
    req.body.data,
    req.body.cantitate,
    req.body.plata,
    req.body.status,
  ];

  db.query(q, [...values,tranzactiiId], (err, data) => {
    if (err) {
      console.error("Error updating transaction:", err);
      return res.status(500).json({ error: "Failed to update transaction." });
    }

    return res.json(data);
  });
});




app.listen(8800, ()=>{
    console.log("Connectat la backend!")
})