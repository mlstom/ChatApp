import database from "../../database";

export default async function getUser(req, res) {
    const db = await database()
    const [user] = await db.execute(`SELECT * FROM User where (email='${req.body.email}' or username='${req.body.email}') and password="${req.body.pass}"`)
    res.json(user) 
}
  