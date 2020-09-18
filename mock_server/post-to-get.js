module.exports = function(req, res, next) {
    if (req.method == 'POST' || req.method == 'PUT'  || req.method == 'DELETE') {
        req.url = '/post'
    }
    req.method = 'GET';
    next();
}