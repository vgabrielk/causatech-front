import { Column } from "../../interfaces/Column";
import DataTable from "../../components/resources/DataTable";
import { Box } from "@mui/material";

export default function Produtos() {

  const columns :Column[] = [
    { id: "name", label: "Nome", align: "left" },
    { id: "value", label: "Valor", align: "right" },
  ];


  return (
    <Box sx={{ width: "100%" }}>
      <DataTable columns={columns} endpoint="/products" />
    </Box>
  );
}
