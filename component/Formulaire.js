import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import DatePicker from '@react-native-community/datetimepicker';

const MaterialForm = ({setMaterials}) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState('');
    const [location, setLocation] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const handleLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.error('Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
    };

        const handleSave = async () => {
            if (!name || !description || !photo || !location || !startDate || !endDate) {
                console.error('Tous les champs doivent être remplis');
                return;
            }
            const materialData = {
                name,
                description,
                photo,
                location,
                startDate,
                endDate,
            };

            try {
                const response = await fetch('http://192.168.1.190:3000/api/materials', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(materialData),
                });

                if (response.ok) {
                    const material = await response.json();
                    setMaterials((materials) => [...materials, material]);
                    console.log('Matériel enregistré avec succès');
                    setName('');
                    setDescription('');
                    setPhoto('');
                    setLocation(null);
                    setStartDate(new Date());
                    setEndDate(new Date());
                } else {
                    console.error('Erreur lors de l\'enregistrement du matériel');
                }
            } catch (error) {
                console.error('Erreur lors de la communication avec le serveur', error);
            }
        };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Nom :</Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} />

            <Text style={styles.label}>Description :</Text>
            <TextInput style={styles.input} value={description} onChangeText={setDescription} />

            <Text style={styles.label}>Photo :</Text>
            <TextInput style={styles.input} value={photo} onChangeText={setPhoto} />

            <Button title="Obtenir la localisation" onPress={handleLocation} />
            {location && (
                <Text>
                    Latitude: {location.coords.latitude}, Longitude: {location.coords.longitude}
                </Text>
            )}

            <Text style={styles.label}>Date de disponibilité (début) :</Text>
            <DatePicker
                style={{ width: 200 }}
                date={startDate}
                mode="date"
                format="YYYY-MM-DD"
                minDate={new Date()}
                onDateChange={(date) => setStartDate(date)}
                value={startDate}/>

            <Text style={styles.label}>Date de disponibilité (fin) :</Text>
            <DatePicker
                style={{ width: 200 }}
                date={endDate}
                mode="date"
                format="YYYY-MM-DD"
                minDate={startDate}
                onDateChange={(date) => setEndDate(date)}
                value={endDate}/>

            <Button style={styles.button} title="Enregistrer" onPress={handleSave} />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
    },
    button: {
        marginTop: 10,
        backgroundColor: 'lightgray',
    },
});

export default MaterialForm;
