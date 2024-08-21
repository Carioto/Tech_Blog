const router = require('express').Router();

const apiRoutes = require('./api-routes.js');
const homeRoutes = require('./home-routes.js');
const dashRoutes = require('./dash-routes.js');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/dash', dashRoutes);

module.exports = router;
