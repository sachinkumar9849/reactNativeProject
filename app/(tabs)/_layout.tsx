import { View, Text, Image } from 'react-native';
import React from 'react';
// import { DrawerToggleButton } from '@react-navigation/drawer';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { images } from '@/constants';
import { DrawerToggleButton } from '@react-navigation/drawer';

const TabsLayout = () => {
    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarStyle: {
                        backgroundColor: '#ffffff',
                        height: 60,
                        paddingBottom: 8,
                        paddingTop: 8,
                        borderTopWidth: 1,
                        borderTopColor: '#E3E3E3',
                    },
                    tabBarActiveTintColor: '#1D4F95',
                    tabBarInactiveTintColor: '#8E8E93',
                    tabBarLabelStyle: {
                        fontSize: 12,
                        fontWeight: '500',
                    },
                    headerLeft: () => <DrawerToggleButton />,
                }}>
                <Tabs.Screen
                    name="home"
                    options={{
                        title: "Home",
                        headerShown: false,
                        tabBarIcon: ({ focused, color, size }) => (
                           
                            <Image source={images.home}/>
                        ),
                    }}
                />
                <Tabs.Screen
                    name="message"
                    options={{
                        title: "Messages",
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <Image 
                               
                                style={{
                                    width: 24,
                                    height: 24,
                                    resizeMode: 'contain',
                                    opacity: focused ? 1 : 0.5
                                }}
                            />
                        ),
                        tabBarBadge: 3,
                    }}
                />
               
            </Tabs>
        </>
    );
};

export default TabsLayout;