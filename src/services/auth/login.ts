import api from "../../api/api";

const login = async (e: any, email: string, password: string, notifications: any) => {
    e.preventDefault();
    try {
        const response = await api.post('/login', {email: email, password: password});
        console.log(response)
        localStorage.setItem('token',response.data.token)
        notifications.show("Logado com sucesso!", {
          severity: 'success',
          autoHideDuration: 2000,
        });
        
        setTimeout(() => {
            if(response.status == 200) {
                return  window.location.href = '/'
            }
        },1000)

        return;
    } catch (error) {
        if (error instanceof Error) {
            const errorMessage =
              (error as any)?.response?.data?.error ||
              error.message ||
              "Erro inesperado";
              notifications.show(errorMessage, {
                severity: 'error',
                autoHideDuration: 2000,
              });
          } else {
            notifications.show("Erro inesperado", {
              severity: 'error',
              autoHideDuration: 2000,
            });
          }
    }
}