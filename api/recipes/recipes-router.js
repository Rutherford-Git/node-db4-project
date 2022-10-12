const router = require('express').Router()

router.use('*', (req, res, err, next) =>{ //eslint-disable-line
    res.json({ api: 'up' })
})

module.exports = router;