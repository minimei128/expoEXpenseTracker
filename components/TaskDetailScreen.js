import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

//Task Detail Screen
export const TaskDetailScreen = (props) => {
    return (
        <View>
            <Text>Task Detail Screen</Text>
            <Text>id: {props.route.params.id}</Text>
            <Text>amount: {props.route.params.amount}</Text>
            <Text>category: {props.route.params.category}</Text>
            <Text>note: {props.route.params.note}</Text>
        </View>
    )
}