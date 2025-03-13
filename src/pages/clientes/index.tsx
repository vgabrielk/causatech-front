import { Box } from "@mui/material";
import { Column } from "../../interfaces/Column";
import DataTable from "../../components/resources/DataTable";

export default function Clientes() {

  const columns :Column[] = [
    { id: "nome", label: "Nome", align: "left" },
    { id: "cpf", label: "CPF", align: "left" },
  ];


  return (
    <Box sx={{ width: "100%" }}>
      <DataTable columns={columns} endpoint="/clientes"/>
    </Box>
  );
}
