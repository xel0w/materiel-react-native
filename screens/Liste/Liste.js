import React, {useEffect, useState} from 'react';
import {FlatList, Text, View} from "react-native";
import Formulaire from "../../component/Formulaire";
import ListeMateriel from "../../component/ListeMateriel";


const Listes = () => {
    const [materials, setMaterials] = useState([]);
    useEffect(() => {
        // Charger la liste des matériels depuis votre API
        fetch('http://192.168.1.190:3000/api/materials')
            .then(response => response.json())
            .then(data => setMaterials(data))
            .catch(error => console.error('Erreur lors du chargement des matériels', error));
    }, [materials]);

    const handleDeleteMaterial = (materialId) => {
        fetch(`http://192.168.1.190:3000/api/materials/${materialId}`, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    setMaterials(prevMaterials => prevMaterials.filter(material => material._id !== materialId));
                } else {
                    console.error('Erreur lors de la suppression du matériau');
                }
            })
            .catch(error => console.error('Erreur lors de la suppression du matériau', error));
    };


    return (
        <View>
            <Formulaire setMaterials={setMaterials}/>
            <ListeMateriel materials={materials} handleDeleteMaterial={handleDeleteMaterial}/>
        </View>

    );
};

export default Listes;