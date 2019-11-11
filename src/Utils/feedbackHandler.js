class FeedbackHandler {
    static error(err, req, res, next) {
        const {
            status = 400,
                message
        } = err;
        const error = message;
        console.log('error', error, 'status error code', status)
        res.status(status).json({
            status: 'error',
            error,
        })
    }
}

export default FeedbackHandler;