import database from "../../database"

export default async function allUsers(req, res) {
    const db = await database()
    const [users] = await db.execute("SELECT * FROM User")
    if(req.method === 'POST'){
       await db.execute(`insert into User(name,surname,email,username,password,imageUrl,verifikacija,slug) values ('${req.body.name}','${req.body.surname}','${req.body.email}','${req.body.username}','${req.body.pass}','${req.body.url}',false, '${req.body.slug}') `)
    }
    res.json(users)
}
  