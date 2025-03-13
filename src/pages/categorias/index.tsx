import { Box } from "@mui/material";
import { Column } from "../../interfaces/Column";
import DataTable from "../../components/resources/DataTable";

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
