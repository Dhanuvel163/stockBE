const handleError = (error,res) => {
    console.log({error})
    if(error.is_error){
        return res.status(error.code).json({
            success: false,
            error: error.message
        })
    }
    return res.status(500).json({
        success: false,
        error: `Error Fetching details : ${error.message}`
    })
}

module.exports = {
    handleError
}