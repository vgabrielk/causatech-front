import { Box } from "@mui/material";
import { Column } from "../../types/interfaces/Column";
import DataTable from "../../components/DataTable";

export default function Categorias() {

  const columns :Column[] = [
    { id: "name", label: "Nome", align: "left" },
  ];


  return (
    <Box sx={{ width: "100%" }}>
      <DataTable columns={columns} endpoint="/categories"/>
    </Box>
  );
}
