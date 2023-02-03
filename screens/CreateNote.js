import React, { useState, useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useNavigation } from "@react-navigation/native"

import { Button, IndexPath, Layout, Select, SelectItem } from "@ui-kitten/components"
import { Dimensions, KeyboardAvoidingView, Platform, StyleSheet, TextInput, View, Text } from "react-native"

import DropDownPicker from "react-native-dropdown-picker"

import { AllData } from "../All-Data"

let STORAGE_KEY = '@user_input'
let STORAGE_KEY_TWO = 'TOW'
let STORAGE_KEY_THREE = 'three'

const CreateNote = () => {

    const navigation = useNavigation()
    // Client
    const [openClient, setOpenClient] = useState(false)
    const [clientVal, setClientVal] = useState(null)
    const [clientList, setClientList] = useState([
        {id: 1, label: 'Zul', value: 'zul'},
        {id: 2, label: 'Zulfadli', value: 'zulfadli'}
      ])

    // Categories
    const [openCategory, setOpenCategory] = useState(false)
    const [categoryVal, setCategoryVal] = useState(null)
    const [categoriesList, setCategoriesList] = useState([
        {id: 1, label: 'Apple', value: 'apple'},
        {id: 2, label: 'Banana', value: 'banana'}
      ])
    
    // Notes
    const [notes, setNotes] = useState('')

    // Get all stored data
    const [getNoteValue, setGetNoteValue] = useState('')
    const [getClientValue, setGetClientValue] = useState('')
    const [getCategoryValue, setGetCategoryValue] = useState('')

    const handleClient = (c) => {

        const newClientData = JSON.stringify(categoriesList)

        AsyncStorage.setItem(STORAGE_KEY_THREE, newClientData)
    }

    const handleCategory = () => {

        const newData = JSON.stringify(categoriesList)

        AsyncStorage.setItem(STORAGE_KEY_THREE, newData)
        
    }

    const saveNoteValue = () => {
        if(notes) {
            AsyncStorage.setItem(STORAGE_KEY, notes)
            // setNotes('')
            // setCategoryVal(null)
            // setClientVal(null)
        }
    }

    const getData = () => {
        AsyncStorage.getItem(STORAGE_KEY).then((value) => {
            setGetNoteValue(value)
        })

        AsyncStorage.getItem(STORAGE_KEY_TWO).then((value) => {
            setGetClientValue(value)
        })

        AsyncStorage.getItem(STORAGE_KEY_THREE).then((value) => {
            setGetCategoryValue(value)
        })

        const newData = {
            client: getClientValue.match(clientVal),
            category: getCategoryValue.match(categoryVal),
            note: getNoteValue
        }

        AllData.push(newData)

        // console.log(AllData)

        // navigation.navigate("Notes")
    }

    return (
        <Layout key="1" style={styles.container}>
            <Text>Client</Text>
            <DropDownPicker
                open={openClient}
                value={clientVal}
                items={clientList}
                setOpen={setOpenClient}
                setValue={setClientVal}
                setItems={setClientList}
                onSelectItem={handleClient}
            />

            <Text>Category</Text>
            <DropDownPicker
                key={categoryVal}
                open={openCategory}
                value={categoryVal}
                items={categoriesList}
                setOpen={setOpenCategory}
                setValue={setCategoryVal}
                setItems={setCategoriesList}
                onSelectItem={handleCategory}
            />

            <Text>Notes : </Text>
            <TextInput
                value={notes}
                onChangeText={(data) => setNotes(data)}
				style={{ color: "black", fontSize: 22 }}
				multiline={true}
				autoFocus
				selectionColor="black"
            />
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.bottom}>
				<Button style={StyleSheet.button} appearance="filled" onPress={saveNoteValue}>
					Create
				</Button>
			</KeyboardAvoidingView>
            <Button style={StyleSheet.button} appearance="filled" onPress={getData}>Show</Button>
            <Text>{getNoteValue}</Text>
            <Text>{getClientValue.match(clientVal)}</Text>
            <Text>{getCategoryValue.match(categoryVal)}</Text>
        </Layout>
    )
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
		color: "black",
		padding: 30,
		paddingTop: 80,

		width: Dimensions.get("window").width
	},
	bottom: {
		flex: 1,
		justifyContent: "flex-end",
		marginBottom: 36
	},
	button: {
		marginBottom: 30
	}
})

export default CreateNote