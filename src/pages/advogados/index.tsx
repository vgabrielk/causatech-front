import { Box } from "@mui/material";
import { Column } from "../../interfaces/Column";
import DataTable from "../../components/resources/DataTable";

export default function Advogados() {

  const columns :Column[] = [
    { id: "nome", label: "Nome", align: "left" },
    { id: "oab", label: "OAB", align: "left" },
    { id: "estado_oab", label: "Estado OAB", align: "left" },
  ];


  return (
    <Box sx={{ width: "100%" }}>
      <DataTable columns={columns} endpoint="/advogados"/>
    </Box>
  );
}
