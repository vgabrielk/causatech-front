import api from "../api/api";
export const createAndUpdate = async (endpoint: string, data: any) => {
    try {
        if(data){
            const response = await api.put(`${endpoint}/${data.id}`, data)
            return{
                message: `${response.data.name} atualizado com sucesso!`,
                response: response.data
            } 
        }
        const response =  await api.post(endpoint, data)
        return{
            message: `${response.data.name} criado com sucesso!`,
            response: response.data
        } 
        
    } catch (error) {
       return {
        message: "Erro ao criar/atualizar item!",
        response: error,
        type: "error"
       }
        
    }
}

export interface Response {
    message: string;
    response: any;
    type?: string;
  }