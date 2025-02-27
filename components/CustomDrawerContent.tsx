import { Image, StyleSheet, Text, View, ImageBackground } from 'react-native';
import React from 'react';
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { images } from '@/constants';

// Make sure this path matches your actual project structure
const loginImage = require('../assets/images/login.png');

const CustomDrawerContent = (props: any) => {
    const { top, bottom } = useSafeAreaInsets();
    
    return (
        <View style={{ flex: 1 }}>
            <ImageBackground 
                source={loginImage}
                style={styles.backgroundImage}
            >
                <View style={styles.profileContainer}>
                    <Image source={images.user}/>
                  <Text className='text-[#FAFAFA] text-[15px] mt-2 font-semibold'>Cameron Williamson</Text>
                </View>
            </ImageBackground>
            
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
          
        </View>
    );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
    backgroundImage: {
        width: '100%',
        height: 200,
        overflow: 'hidden',
    },
    profileContainer: {
        flex: 1,
       
        alignItems: 'center',
        justifyContent: 'center',
    },
    userImage: {
        resizeMode: 'contain',
    }
});