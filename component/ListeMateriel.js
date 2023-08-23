import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Button, StyleSheet, ScrollView} from 'react-native';
import moment from 'moment';
import axios from 'axios';
const MaterialList = ({ materials, handleDeleteMaterial }) => {
    moment.locale('fr');
    const [nearestCities, setNearestCities] = useState({});
    const [reservedMaterials, setReservedMaterials] = useState([]);
    const formatDate = (dateString) => {
        return moment(dateString).format('DD/MM/YYYY');
    };
    const getNearestCity = async (latitude, longitude) => {
        try {
            const response = await axios.get(
                `https://api-adresse.data.gouv.fr/reverse/?lon=${longitude}&lat=${latitude}`
            );

            if (response.data && response.data.features.length > 0) {
                const nearestCity = response.data.features[0].properties.city;
                return nearestCity;
            }

            return 'Ville inconnue';
        } catch (error) {
            console.error('Erreur lors de la récupération de la ville la plus proche', error);
            return 'Erreur de géolocalisation';
        }
    };
    const handleReserveMaterial = (materialId) => {
        if (!reservedMaterials.includes(materialId)) {
            setReservedMaterials(prevReservedMaterials => [...prevReservedMaterials, materialId]);
        }
    };
    const renderItem = ({ item }) => (
        <View style={styles.materialItem}>
            <Text style={styles.materialName}>Nom: {item.name}</Text>
            <Text>Description: {item.description}</Text>
            <Text>Photo: {item.photo}</Text>
            <Text>Ville: {nearestCities[item._id] || 'Chargement...'}</Text>
            <Text>Date de début: {formatDate(item.startDate)}</Text>
            <Text>Date de fin: {formatDate(item.endDate)}</Text>
            {reservedMaterials.includes(item._id) ? (
                <Text style={styles.reservedText}>Réservé</Text>
            ) : (
                <Button
                    title="Réserver"
                    onPress={() => handleReserveMaterial(item._id)}
                />
            )}
            <Button
                title="Supprimer"
                onPress={() => handleDeleteMaterial(item._id)}
                color="red"
            />
        </View>
    );
    useEffect(() => {
        const fetchNearestCities = async () => {
            const cityPromises = materials.map(async (material) => {
                if (material.location) {
                    const latitude = material.location.coords.latitude;
                    const longitude = material.location.coords.longitude;
                    const nearestCity = await getNearestCity(latitude, longitude);
                    return [material._id, nearestCity];
                }
                return [material._id, ''];
            });

            const cities = await Promise.all(cityPromises);
            const citiesMap = Object.fromEntries(cities);
            setNearestCities(citiesMap);
        };

        fetchNearestCities();
    }, [materials]);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.headerText}>Liste des matériels :</Text>
            <FlatList
                data={materials}
                renderItem={renderItem}
                keyExtractor={item => item._id}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 500,
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    materialItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        padding: 10,
        marginBottom: 15,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
    },
    materialName: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
});

export default MaterialList;
