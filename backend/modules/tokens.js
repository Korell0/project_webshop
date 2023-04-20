function ProtectedRoute(table){
    let whitelist = [""];
    return whitelist.filter(e=>e==table).length <= 0;
}





module.exports = {
    Check:(req, res, next)=>{
        if (req.headers.authorization){

        }
        else {
            if (ProtectedRoute(req.params.table)){

            }
            else next();
        }
    }
}