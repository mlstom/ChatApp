import database from "../../../../database";

export default async function getUserByText(req, res) {
    const db = await database()
    const [user] = await db.execute(`SELECT * FROM User where email= '${req.query.email}' `)
    if( req.method=="POST"){
        const [user] = await db.execute(`UPDATE User SET password='${req.body.pass}' where email= "${req.query.email}" `)
    }
    res.json(user) 
}