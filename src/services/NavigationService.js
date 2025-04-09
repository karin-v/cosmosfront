import router from "@/router";

export default {

    navigateToErrorView() {
        router.push({name: 'errorRoute'})
    },

    navigateToHomeView() {
        router.push({name: 'homeRoute'});
    },

    navigateToLoginView() {
        router.push({name: 'loginRoute'})
    },

    navigateToPlanetsView() {
        router.push({name: 'planetsRoute'})
    },

    navigateToRoutesView(params = {}) {
        router.push({name: 'routesRoute', query: params})
    },

    navigateToBookingView(params = {}) {
        router.push({name: 'bookingRoute', query: params})
    }
}