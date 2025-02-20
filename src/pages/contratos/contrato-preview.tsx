import React, { useEffect, useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import { Document as ReactPDFDocument, Page as ReactPDFPage } from 'react-pdf';
import { ContratosPDF } from './contratos-pdf';

interface Contract {
    contract_number: string;
    start_date: string;
    end_date: string;
    
  }
  
  interface ContractPreviewProps {
    contract: Contract; 
  }

const ContractPreview: React.FC<ContractPreviewProps> = ({ contract }) => {
    console.log(contract)
    const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);


  useEffect(() => {
    const generatePdf = async () => {
      const blob = await pdf(<ContratosPDF contract={contract} />).toBlob();
      console.log(URL.createObjectURL(blob));
      setPdfBlob(blob);
    };

    generatePdf();
  }, []);

  return (
    <div>
      {pdfBlob && contract?.length > 1? (
      <div>
        <h3>Pré-visualização do Contrato</h3>
        <embed
          src={URL.createObjectURL(pdfBlob)}
          type="application/pdf"
          width="100%"
          height="600px"
        />
      </div>
    ) : (
      <p>Gerando o PDF...</p>
    )}
    </div>
  );
};

export default ContractPreview;
