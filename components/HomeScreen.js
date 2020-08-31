import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import {useNavigation} from '@react-navigation/native'

//Task Management Planner Screen
export const HomeScreen = (props) => {

    const navigation = useNavigation()

    return (
        <View>
            <Text>HomeScreen</Text>
            <Button title="Go to Detail" onPress={() => (navigation.navigate("Task Detail"))} />
        </View>
    )
}