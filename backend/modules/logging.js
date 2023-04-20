module.exports = (ip, message)=>{
    console.log(`${new Date().toISOString()} ${ip} -> ${message}`);
}