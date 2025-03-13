import { Box } from "@mui/material";
import { Column } from "../../interfaces/Column";
import DataTable from "../../components/resources/DataTable";

export default function Usuarios() {

  const columns :Column[] = [
    { id: "name", label: "Nome", align: "left" },
    { id: "email", label: "Email", align: "left" },
  ];


  return (
    <Box sx={{ width: "100%" }}>
      <DataTable columns={columns} endpoint="/users"/>
    </Box>
  );
}
