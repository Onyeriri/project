class FeedbackHandler {
    static error(err, req, res, next) {
        const {
            status,
            message
        } = err;
        const error = message;
        res.status(status).json({
            status: 'error',
            error,
        })
    }
}

export default FeedbackHandler;