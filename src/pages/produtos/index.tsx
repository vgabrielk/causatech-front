import { Column } from "../../types/interfaces/Column";
import DataTable from "../../components/DataTable";

export default function Produtos() {

  const columns :Column[] = [
    { id: "name", label: "Nome", align: "left" },
    { id: "value", label: "Valor", align: "right" },
  ];


  return (
    <Box sx={{ width: "100%" }}>
      <DataTable columns={columns} endpoint="/products"  transformRowBeforeUpdate={(row) => ({
    ...row,
    companyId: row?.company?.id || null,
    categoryId: row?.category?.id || null,
  })}/>
    </Box>
  );
}
