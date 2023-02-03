import React, { useEffect, useState } from "react"
import { Dimensions, KeyboardAvoidingView, Platform, StyleSheet, TextInput, View, Text, Pi, Button } from "react-native"

const Note = ({ id, text, deleteNote }) => {

    return (
        <View>
            <Text>{text}</Text>
            <Button onPress={() => deleteNote(id)}>Delete</Button>
        </View>
    )
}

export default Note