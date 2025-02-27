import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            const token = await AsyncStorage.getItem("userToken");
            const storedUserData = await AsyncStorage.getItem("userData");
            if (token && storedUserData) {
                setUserData(JSON.parse(storedUserData));
                setIsAuthenticated(true);
            }
        } catch (error) {
            console.log("Error checking auth status", error);
        } finally {
            setIsLoading(false);
        }
    };

    const signIn = async (userData) => {
        try {
            await AsyncStorage.setItem("userToken", userData.token);
            await AsyncStorage.setItem("userData", JSON.stringify(userData));
            setUserData(userData);
            setIsAuthenticated(true);
        } catch (error) {
            console.log("error storing auth data", error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            // Remove all authentication-related data from AsyncStorage
            await AsyncStorage.multiRemove(["userToken", "userData"]);
            // Reset state
            setUserData(null);
            setIsAuthenticated(false);
        } catch (error) {
            console.log("Error during logout", error);
            throw error;
        }
    };

    return {
        isAuthenticated,
        isLoading,
        signIn,
        logout,
        userData
    };
};
