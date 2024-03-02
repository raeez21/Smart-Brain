const handleSignIn = (req,resp, db, bcrypt)=>{
    const {email, password} = req.body;
    if(!email || !password){
        return resp.status(400).json("incorrect form submission")
    }

    db.select('email','hash').from('login')
    .where({'email':email})
    .then(data=>{
        if(data.length === 0) {
            throw new Error("Email not found");
        }
        const isValid = bcrypt.compareSync(password,data[0].hash)
        if(isValid){
            db.select("*").from('users').where({'email':email})
            .then(user=>{
                resp.json(user[0])
            })
            .catch(err=>resp.status(400).json("Unable to get user"))
        }
        else{
            resp.status(400).json("wrong creds")
        }
        
    })
    .catch(err=>resp.status(400).json("wrong credss"))
}
export default handleSignIn