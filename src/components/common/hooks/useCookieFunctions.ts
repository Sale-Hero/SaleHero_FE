export function useCookieFunctions() {
    const getCookie = (name:string) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) { // @ts-ignore
            return parts.pop().split(';').shift();
        }
        return null;
    };

    const removeCookie = (name: string) => {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    };

    const setCookie = (
        name: string,
        value: string,
        options: {
            maxAge?: number,
            path?: string,
            domain?: string,
            secure?: boolean,
            httpOnly?: boolean
        } = {}
    ) => {
        const {
            maxAge = 3600,
            path = '/',
            domain = '',
            secure = false,
            httpOnly = false
        } = options;

        let cookieString = `${name}=${encodeURIComponent(value)}`;

        // Add path
        cookieString += `; path=${path}`;

        // Add domain if specified
        if (domain) {
            cookieString += `; domain=${domain}`;
        }

        // Add max age (in seconds)
        if (maxAge) {
            cookieString += `; max-age=${maxAge}`;
        }

        // Add secure flag
        if (secure) {
            cookieString += '; secure';
        }


        // Set the cookie
        document.cookie = cookieString;
    };

    return{
        getCookie, removeCookie, setCookie
    }
}