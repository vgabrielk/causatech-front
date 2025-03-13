import { Download, SkipNext, SkipPrevious } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { FormEvent } from "react";
import { ContratosPDF } from "../../pages/contratos/contratos-pdf";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

export default function TabButtons({ setTabIndex, tabIndex, contract, id }) {
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<Element>) => {
    e.preventDefault();
    try {
      if (id) {
        (await api.put(`/contracts/${id}`, contract)) as Response;
        toast.success("Atualizado com sucesso!");
      } else {
        (await api.post("/contracts", contract)) as Response;
        toast.success("Cadastrado com sucesso!");
        navigate("/contratos");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        const errorMessage =
          (error as any)?.response?.data?.message ||
          error.message ||
          "Erro inesperado";
        toast.error(errorMessage);
      } else {
        toast.error("Erro inesperado");
      }
    }
  };
  return (
    <>
      <Box sx={{ mt: 2, display: "flex", gap: 2, marginBottom: 2 }}>
        <>
          <Button
            onClick={() => setTabIndex(tabIndex - 1)}
            variant="contained"
            color="primary"
            disabled={tabIndex == 0}
          >
            <SkipPrevious />
          </Button>
        </>
        <>
          <Button
            onClick={() => setTabIndex(tabIndex + 1)}
            variant="contained"
            color="primary"
            disabled={tabIndex == 4}
          >
            <SkipNext />
          </Button>
        </>

        <Button
          onClick={(e: FormEvent<Element>) => handleSubmit(e)}
          variant="contained"
          color="primary"
        >
          Atualizar contrato
        </Button>

        {id && (
          <PDFDownloadLink
            className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-colorPrimary MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-colorPrimary css-6si9qx-MuiButtonBase-root-MuiButton-root"
            document={<ContratosPDF contract={contract} />}
            fileName={`CT-${contract.contract_number}`}
          >
            <Download />
          </PDFDownloadLink>
        )}
      </Box>
    </>
  );
}
