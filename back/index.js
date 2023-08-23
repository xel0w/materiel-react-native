const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;


// Connexion à la base de données MongoDB
mongoose.connect('mongodb+srv://Xel0w:Test1234@cluster0.1yteva8.mongodb.net/reactnative', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erreur de connexion à MongoDB :'));
db.once('open', () => {
    console.log('Connecté à la base de données MongoDB');
});

// Schéma de modèle pour le matériel
const materialSchema = new mongoose.Schema({
    name: String,
    description: String,
    photo: String,
    location: Object,
    startDate: Date,
    endDate: Date,
    // Autres champs
});
// Schéma de modèle pour les emails
const emailSchema = new mongoose.Schema({
    email: String,
    // Autres champs
});

const Material = mongoose.model('Materials', materialSchema);
const Email = mongoose.model('Emails', emailSchema);

const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
};
app.use(bodyParser.json());
app.use(cors(corsOptions));

// Endpoint pour créer un matériel
app.post('/api/materials', async (req, res) => {
    try {
        const { name, description, photo, location, startDate, endDate } = req.body;
        const newMaterial = new Material({ name, description, photo, location, startDate, endDate });
        await newMaterial.save();
        res.status(201).json(newMaterial);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création du matériel' });
    }
});

// Endpoint pour obtenir tous les matériels
app.get('/api/materials', async (req, res) => {
    try {
        const materials = await Material.find();
        res.json(materials);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des matériels' });
    }
});

// Endpoint pour supprimer un matériel
app.delete('/api/materials/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Material.findByIdAndDelete(id);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression du matériel' });
    }
});

app.get('/api/emails', async (req, res) => {
    try {
        const emails = await Email.find();
        console.log(emails);
        res.json(emails);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des emails' });
    }
});

const INSECURE_PORT = 3000;
app.listen(INSECURE_PORT, () => {
    console.log(`Server is running on insecure port ${INSECURE_PORT}.`);
});