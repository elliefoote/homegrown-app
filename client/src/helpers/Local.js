// All localStorage implementation is here.

 class Local {

    static saveUserInfo(token, user) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
    }

    static saveSellerInfo(token, seller) {
        localStorage.setItem('token', token);
        localStorage.setItem('seller', JSON.stringify(seller));
    }
    
    static removeUserInfo() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    static removeSellerInfo() {
        localStorage.removeItem('token');
        localStorage.removeItem('seller');
    }
    
    static getToken() {
        return (localStorage.getItem('token') || '');
    }
    
    static getUser() {
        let userjson = localStorage.getItem('user');
        return userjson ? JSON.parse(userjson) : null;
    }

    static getSeller() {
        let sellerjson = localStorage.getItem('seller');
        return sellerjson ? JSON.parse(sellerjson) : null;
    }

    static getUserId() {
        let userjson = localStorage.getItem('user');
        if (!userjson) {
            return '';
        }

        let user = JSON.parse(userjson);
        return user.userid;
    }

    static getSellerId() {
        let sellerjson = localStorage.getItem('seller');
        if (!sellerjson) {
            return '';
        }

        let seller = JSON.parse(sellerjson);
        return seller.sellerid;
    }

    static getUsername() {
        let userjson = localStorage.getItem('user');
        if (!userjson) {
            return '';
        }

        let user = JSON.parse(userjson);
        return user.username;
    }

    static getSellerUsername() {
        let sellerjson = localStorage.getItem('seller');
        if (!sellerjson) {
            return '';
        }

        let seller = JSON.parse(sellerjson);
        return seller.username;
    }
}

export default Local;