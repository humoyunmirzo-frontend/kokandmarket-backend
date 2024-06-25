const sendError = (res, error)=>{
    console.error(error);
    return res.status(500).json({
        success: false,
        message: error?.message
    })
}

module.exports = sendError