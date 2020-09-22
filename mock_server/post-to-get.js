module.exports = function(req, res, next) {
    console.log('mock server req.headers:', req.headers);
    if (req.method == 'POST' || req.method == 'PUT'  || req.method == 'DELETE') {
        req.url = '/post'
    }
    req.method = 'GET';
    next();
}