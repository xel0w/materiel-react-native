import React, { useState } from 'react';
import { View, TextInput, Text, Button, StyleSheet } from 'react-native';

const PasswordInput = () => {
    const [password, setPassword] = useState('');

    const [minLength, setMinLength] = useState(0);
    const [minDigits, setMinDigits] = useState(0);
    const [minLetters, setMinLetters] = useState(0);
    const [minSpecialChars, setMinSpecialChars] = useState(0);

    const isPasswordValid = (password) => {
        const hasMinLength = password.length >= minLength;

        const digitCount = (password.match(/\d/g) || []).length;
        const letterCount = (password.match(/[a-zA-Z]/g) || []).length;
        const specialCharCount = (password.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g) || []).length;

        const hasMinDigits = digitCount >= minDigits;
        const hasMinLetters = letterCount >= minLetters;
        const hasMinSpecialChars = specialCharCount >= minSpecialChars;

        return hasMinLength && hasMinDigits && hasMinLetters && hasMinSpecialChars;
    };

    return (
        <View style={styles.container}>
            <TextInput
                secureTextEntry
                placeholder="Mot de passe"
                onChangeText={text => setPassword(text)}
                value={password}
                style={styles.input}
            />
            <Text style={[styles.validationText, { color: isPasswordValid(password) ? 'green' : 'red' }]}>
                {isPasswordValid(password) ? 'Mot de passe valide' : 'Mot de passe non valide'}
            </Text>

            <Text>Longueur minimale:</Text>
            <TextInput
                keyboardType="numeric"
                onChangeText={text => {
                    const numValue = parseInt(text);
                    if (!isNaN(numValue)) {
                        setMinLength(numValue);
                    }
                }}
                value={minLength.toString()}
                style={styles.input}
            />

            <Text>Nombre minimal de chiffres:</Text>
            <TextInput
                keyboardType="numeric"
                onChangeText={text => {
                    const numValue = parseInt(text);
                    if (!isNaN(numValue)) {
                        setMinDigits(numValue);
                    }
                }}
                value={minDigits.toString()}
                style={styles.input}
            />

            <Text>Nombre minimal de lettres:</Text>
            <TextInput
                keyboardType="numeric"
                onChangeText={text => {
                    const numValue = parseInt(text);
                    if (!isNaN(numValue)) {
                        setMinLetters(numValue);
                    }
                }}
                value={minLetters.toString()}
                style={styles.input}
            />

            <Text>Nombre minimal de caractères spéciaux:</Text>
            <TextInput
                keyboardType="numeric"
                onChangeText={text => {
                    const numValue = parseInt(text);
                    if (!isNaN(numValue)) {
                        setMinSpecialChars(numValue);
                    }
                }}
                value={minSpecialChars.toString()}
                style={styles.input}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        paddingHorizontal: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        marginBottom: 10,
    },
    validationText: {
        marginBottom: 10,
    },
});

export default PasswordInput;
