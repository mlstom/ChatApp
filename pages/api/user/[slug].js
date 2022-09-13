import database from "../../../database";

export default async function getUserByText(req, res) {
    const db = await database()
    const [user] = await db.execute(`SELECT * FROM User where slug= '${req.query.slug}' `)
    if( req.method=="POST"){
        const [user] = await db.execute(`UPDATE User SET verifikacija=true where slug= "${req.query.slug}" `)
    }
    res.json(user) 
}