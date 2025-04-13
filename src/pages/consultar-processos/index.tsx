import { Button, Card, CardContent, CardHeader, TextField } from "@mui/material";
import { useState } from "react";
import api from "../../api/api";

export default function ConsultarProcessos(){
    const [numero, setNumero] = useState('')
    const public_api_key = 'cDZHYzlZa0JadVREZDJCendQbXY6SkJlTzNjLV9TRENyQk1RdnFKZGRQdw=='
    const url = 'https://api-publica.datajud.cnj.jus.br/api_publica_trf1/_search';


      const requestData = {
        query: {
          match: {
            numeroProcesso: numero
          }
        }
      };

      const headers = {
        'Authorization': `APIKey ${public_api_key}`,
        'Content-Type': 'application/json'
      };

    const consulta = async () => {
        try {
            const response = await api.post(url, requestData,{headers})
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Card sx={{height: '600px'}}>
                <CardHeader>
                    
                </CardHeader>
                <CardContent>
                <TextField
                    fullWidth
                    name="numero_processo"
                    label="Número do processo"
                    placeholder="Digite o número do processo para consulta"
                    onChange={(e) => setNumero(e.target.value)}
                />
                <Button onClick={consulta}>Consultar</Button>
                </CardContent>
            </Card>
        </>
    )
}