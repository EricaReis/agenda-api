function result(data, message, status) {
    return {
        response: {
            data,
            message
        },
        status
    }
}

module.exports = result;