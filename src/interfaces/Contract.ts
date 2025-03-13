export interface Contract {
    user_id: number | null;
    contract_number: string;
    start_date: string;
    end_date: string | null;
    value: string | null;
    status: "active" | "inactive" | "canceled" | null;
    details: {
    contrato: {
        servico_prestado?: string;
        vezes_no_mes?: string;
        tempo_servico?: string;
        };
    vezes_no_mes?: string;
    tempo_servico?: string;
      contratado: {
        contratado_natureza?: string;
        razao_social?: string;
        cnpj?: string;
        endereco?: string;
        email?: string;
        representante_legal?: string;
        nacionalidade?: string;
        estado_civil?: string;
        cpf?: string;
        nome_completo?: string;
      };
      contratante: {
        contratante_natureza?: string;
        razao_social?: string;
        cnpj?: string;
        endereco?: string;
        email?: string;
        representante_legal?: string;
        nacionalidade?: string;
        estado_civil?: string;
        cpf?: string;
        nome_completo?: string;
      };
      pagamento: {
        valor_servico?: string; // Valor em reais (número e por extenso)
        pagamento_unico_ou_recorrente?: string; // Checkbox
        dia_pagamento_unico?: string; // Caso seja pagamento único
        quantas_vezes?: string; // Caso seja pagamento recorrente
        valor_de_cada_pagamento?: string; // Ex: 750 (setecentos) // Numérico e por extenso
        data_primeiro_pagamento?: string; // Campo de data
        data_primeiro_pagamento_recorrente?: string; // Campo de data
        meio_de_pagamento?: string; // Transferência bancária / Boleto / Outro
        outro_meio_de_pagamento?: string; // Apenas se for selecionado "Outro"
      };
  
      clausulas: { nome: string; descricao: string }[];
  
      assinatura: {
        cidade_assinatura?: string; // Cidade onde foi feita a assinatura do contrato
        data_assinatura?: string; // Data da assinatura
      };
  
      testemunha: {
        tem_testemunhas?: string; // Se o contrato terá testemunhas
        nome_primeira_testemunha?: string;
        cpf_primeira_testemunha?: string;
        nome_segunda_testemunha?: string;
        cpf_segunda_testemunha?: string;
      };
    };
  }