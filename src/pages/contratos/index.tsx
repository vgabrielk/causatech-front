import { Box } from "@mui/material";
import { Column } from "../../types/interfaces/Column";
import DataTable from "../../components/DataTable";

export default function Contratos() {
  const columns: Column[] = [
    { id: "contract_number", label: "Número do Contrato" },
    { id: "servico_prestado", label: "Serviço prestado" },
    { id: "documento", label: "Documento contratante", align: "right" },
    { id: "start_date", label: "Data de Início", align: "center" },
    { id: "end_date", label: "Data de Término", align: "center" },
  ];


  return (
    <Box sx={{ width: "100%" }}>
      <DataTable columns={columns} endpoint="/contracts" adjustRow={(row) => ({
    ...row,
    documento: row?.details?.contratante?.cnpj || row?.details?.contratante?.cpf,
    servico_prestado: row?.details?.contrato?.servico_prestado || '', 
    status: row?.status === 'active' ? 'ATIVO' : 'INATIVO', 
  })} />
    </Box>
  );
}
