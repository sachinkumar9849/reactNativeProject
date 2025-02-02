import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAuth=()=>{
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        checkAuthStatus();
    },[]);

    const checkAuthStatus= async()=>{
        try {
            const token = await AsyncStorage.getItem("userToken");
            setIsAuthenticated(!!token);
        } catch (error) {
            console.log("Error checking auth status", error)
            
        }finally{
            setIsLoading(false);
        }
    }
    const signIn = async (userData)=>{
        try {
            await AsyncStorage.setItem("userToken", userData.token);
            await AsyncStorage.setItem("userData",JSON.stringify(userData));
            setIsAuthenticated(true);
        } catch (error) {
            console.log("error storing auth data",error);
            throw error;
            
        }
    }
    return{
        isAuthenticated,
        isLoading,
        signIn,
    }
}