export enum AppRoutes {
    BaseUrl = '/',
    Products = '/products/:category',
    ProductDetails = '/product-details/:id',
    Basket = '/basket',
    Login = '/login',
    Registration = '/register',
    RegistrationSuccess = '/register-success',
    UserInfo = '/user-info',
    NotFound = '/404'
}

export enum CategoriesRoutes {
    Phones = '/products/phones',
    Tablets = '/products/tablets',
    Accessories = '/products/accessories'
}