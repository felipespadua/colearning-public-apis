const express = require("express");
const axios = require("axios");
const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/assets", async (req, res) => {
    const { limit = 10, offset = 0, ids, search } = req.query;
    try{
        const response = await axios.get('http://api.coincap.io/v2/assets',
            {
                params: {
                    limit,
                    offset,
                    ids,
                    search
                }
            })
            .then(response => response.data)

        res.status(200).json(response)
    }catch(error){
        console.log(error)
        res.status(500).json("Internal server error")
    }
})

app.get("/assets/:id", async (req, res) => {
    const { id } = req.params;
    try{
        const response = await axios.get(`http://api.coincap.io/v2/assets/${id}`)
            .then(response => response.data)

        res.status(200).json(response)
    }catch(error){
        console.log(error)
        res.status(500).json("Internal server error")
    }
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
