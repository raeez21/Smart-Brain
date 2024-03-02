const handleProfile = (req,resp, db)=>{
    const {id} = req.params;
    
    db.select("*").from("users").where({id:id}).then(user=>{
        if(user.length){
            resp.json(user[0])
        }
        else{
            throw Error
        }
        
    })
    .catch(err=>resp.status(404).json("Not Found"))
}
export default handleProfile;