const catchError = ()=>{
    console.log(error);
    res.status(400).json({
      message: "server error",
    });
}

module.exports = {catchError}