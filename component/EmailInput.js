import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

const EmailInput = ({ checkEmailExistence }) => {
    const [email, setEmail] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(true);

    useEffect(() => {
            checkEmailExistence(email, setIsValidEmail);
        console.log("email",email);
    }, [email]);

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Email"
                onChangeText={text => setEmail(text)}
                value={email}
                style={styles.input}
            />
            {email !== '' && (
                <Text style={[styles.validationText, { color: isValidEmail ? 'green' : 'red' }]}>
                    {isValidEmail ? 'Valide' : 'Non valide'}
                </Text>
            )}
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

export default EmailInput;
