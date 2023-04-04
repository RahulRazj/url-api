import urlRoutes from './url_routes.js'
const routes = app => {
    app.use('/', urlRoutes);
}

export default routes