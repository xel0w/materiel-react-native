import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import AppStyles from '../../AppStyles';
import EmailInput from '../../component/EmailInput';
import PasswordInput from '../../component/PasswordInput';

const Connexion = () => {
    const [emailList, setEmailList] = useState([]);

    useEffect(() => {
        fetch('http://192.168.1.190:3000/api/emails')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des emails');
                }
                return response.json();
            })
            .then(data => {
                setEmailList(data);
                console.log("emaillist",data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    function checkEmailExistence(email, setIsValidEmail) {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const isEmailValidFormat = emailPattern.test(email);

        if (isEmailValidFormat) {
            const emailExists = emailList.some(item => item.email === email);
            setIsValidEmail(!emailExists);
        } else {
            setIsValidEmail(false);
        }
    }


    const styles = AppStyles();
    return (
        <View style={styles.container}>
            <EmailInput checkEmailExistence={checkEmailExistence} />
            <PasswordInput />
        </View>
    );
};

export default Connexion;
