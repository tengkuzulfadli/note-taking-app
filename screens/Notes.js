import React, { useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { Divider, List, ListItem, Text } from "@ui-kitten/components"

import { Layout } from "@ui-kitten/components"
import { FlatList, StyleSheet, View } from "react-native"
import Note from "./Note"
import CreateNote from "./CreateNote"

import { v4 as uuid } from 'react-native-uuid'

import { AllData } from "../All-Data"

const Notes = () => {

    const data = AsyncStorage.getAllKeys()

    

    console.log("from notes : ", AllData)
    return (
        <View style={{ backgroundColor: "white", flex: 1 }}>
            <Text style={{ color: "black" }}>Notes</Text>
            <FlatList
            />
        </View>
    )
}

const styles = StyleSheet.create({
	container: {
		fontSize: 20,
        color: "black"
	},

	item: {
		marginVertical: 4
	},
	title: {
		textAlign: "center",
		marginTop: 50
	},
	notes: {
		fontSize: 24
	}
})

export default Notes