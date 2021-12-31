const knex=require('knex')({
    client: "mysql",
    connection:{
        host : "localhost",
        user : "root",
        password : "Pragati@12",
        database: "navgurukul"

    }
})
knex.schema.hasTable("user",(table)=>{
    table.increments("id")
    table.string('name')
    table.string('email')
    table.string('password')
}).then ((data)=>{
    console.log('table created')
}).catch ((err)=>{
    console.log(err.message)
})
module.exports=knex