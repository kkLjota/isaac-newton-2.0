import express from 'express';
import cors from 'cors';
import axios from 'axios'

const PORT = 4000;
const app = express();

app.use(cors())

app.get('/search', async (req, res) => {

    const apiKey = 'b6436e8bcc98c8d8140adcb8c4ff54c4526564f4832f305927ed6b62d8271134';

    const URL = "https://serpapi.com/search.json"

    const { query } = req.query;

    try{
        const response = await axios.get(URL, {
            params: {
              q: query,
              api_key: apiKey,
              num: 10,
              engine: "google",
              google_domain: "google.com.br",
              gl: "br",
              h1: "pt-br"
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "ocorreu um erro ao fazer a requisição à API" });
    }
});

app.listen(PORT, () => {
    console.log(`O proxy está rodando na porta ${PORT}`);
});