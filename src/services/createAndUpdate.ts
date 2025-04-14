import api from "../api/api";
export const createAndUpdate = async (endpoint: string, data: any) => {
    try {
        if(data.id){
            const response = await api.put(`${endpoint}/${data.id}`, data)
            return{
                message: `Atualizado com sucesso!`,
                response: response.data,
                type: "success"

            } 
        }
        const response =  await api.post(endpoint, data)
        return{
            message: `Criado com sucesso!`,
            response: response.data,
            type: "success"

        } 
        
    } catch (error: any) {
       return {
        message: "Erro ao criar/atualizar item!",
        response: error.response.data,
        type: "error"
       }
        
    }
}

export interface Response {
    message: string;
    response: any;
    type?: string;
  }