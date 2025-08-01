import { create } from 'zustand';
import jwtDecode from 'jwt-decode';
import { getToken, removeToken, setToken } from '../utils/token';

const useAuthStore = create((set) => ({
    user: getToken() ? jwtDecode(getToken()) : null,

    login: (token) => {
        setToken(token);
        set({ user: jwtDecode(token) });
    },

    logout: () => {
        removeToken();
        set({ user: null });
    },
}));

export default useAuthStore;


// use case here

// const { user, login, logout } = useAuthStore();
