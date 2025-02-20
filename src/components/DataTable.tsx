import { useEffect, useState } from "react";
import { DataTableProps } from "../types/interfaces/DataTableProps";
import { Column } from "../types/interfaces/Column";

import { DataGrid, GridAddIcon, GridColDef } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import api from "../api/api";

export default function DataTable({ columns, endpoint, adjustRow }: DataTableProps) {
  const [data, setData] = useState<Column[] | any>([]);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const paginationModel = { page: 0, pageSize: 5 };
  const navigate = useNavigate();

  const redirectToEditPage = (id: string) => {
    navigate(`edit/${id}`);
  };

  const redirectToCreatePage = () => {
    navigate(`add`);
  };

  const getData = async () => {
    setLoading(true);
    try {
      const response = await api.get(endpoint);
      const adjustedData = response.data?.data.map((row: any) =>
        adjustRow ? adjustRow(row) : row
      );
      setData(adjustedData);
    } catch (error) {
      console.log(error);
    }
    finally{
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    window.confirm("Deseja realmente excluir o(s) item(s) selecionado(s)?");
    try {
      await Promise.all(
        selectedRows.map((id) => api.delete(`${endpoint}/${id}`))
      );
      const removedRows = data.filter(
        (row: { id: string }) => !selectedRows.includes(row.id)
      );
      setData(removedRows);
      setSelectedRows([]);
      toast.success("Item(s) excluído(s) com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir:", error);
      toast.error("Erro ao excluir item(s)!");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const gridColumns: GridColDef[] = columns.map((column) => ({
    field: column?.id,
    headerName: column.label,
    flex: 1,
    headerAlign: column.align || "left",
    align: column.align || "left",
    editable: true,
  }));

  return (
    <div>
      <div  style={{marginBottom: 10, display: 'flex', gap: 10}}>
      {selectedRows.length > 0 && (
        <Button
        variant="contained"
        color="error"
        onClick={handleDelete}
        >
          Excluir {selectedRows.length} item(s)
        </Button>
      )}
      {selectedRows.length > 0 && selectedRows.length < 2 && (
        <Button
        variant="contained"
        color="primary"
        onClick={() => redirectToEditPage(selectedRows[0])}
        >
          Editar {selectedRows.length} item
        </Button>
      )}
      <Button
        variant="contained"
        color="primary"
        endIcon={<GridAddIcon />}
        onClick={redirectToCreatePage}
        >
        Adicionar
      </Button>
        </div>
      <DataGrid
        sx={{width: '100%'}}
        rows={data}
        columns={gridColumns}
        checkboxSelection
        onRowClick={(row) => navigate(`${location.pathname}/edit/${row.id}`)}
        onRowSelectionModelChange={(ids) => setSelectedRows(ids as string[])}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        pagination
        loading={loading}
      />
    </div>
  );
}
