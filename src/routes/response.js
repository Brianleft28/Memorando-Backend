const response = {
    success: function (req, res, message, status) {
        res.status(status || 200).json({
            error: false,
            body: message,
        });
    },

    error: function (req, res, message, code, status) {
        res.status(status || 500).json({
            error: true,
            code: code,
            body: {
                errors: [
                    {
                        msg: message,
                    },
                ],
            },
        });
    },
};

export default response;
