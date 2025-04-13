import { Document, Page, Text, StyleSheet, View } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 16,
    fontWeight: 300
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  text: {
    lineHeight: 1.5,
    marginBottom: 5,
  },
  textBold: {
    fontWeight: 900,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '900',
    marginTop: 15,
    marginBottom: 10,
    paddingBottom: 5,
  },
  sectionSubTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },
  separator: {
    marginTop: 5,
    marginBottom: 5,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    fontSize: 6,
    textAlign: 'center',
    color: 'grey',
  },
  table: {
    display: 'flex',
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: '1px solid #ddd',
  },
  tableCell: {
    width: '33%',
    padding: 5,
    fontSize: 8,
  },
  bold: {
    fontWeight: 'bold',
  },
  signatureSection: {
    marginTop: 50,
    textAlign: 'center',
    fontSize: 8,
  },
  signatureLine: {
    borderTop: '1px solid black',
    width: '50%',
    margin: '0 auto',
    marginTop: 15,
  },
  signatureText: {
    marginTop: 5,
  },
});

export const ContratosPDF = ({ contract }) => {
  const contratanteInfo = contract?.details?.contratante;
  const contratanteText = contratanteInfo?.contratante_natureza === 'pj'
    ? `${contratanteInfo?.razao_social}, CNPJ ${contratanteInfo?.cnpj}, com sede em ${contratanteInfo?.endereco}`
    : `${contratanteInfo?.nome_completo}, CPF ${contratanteInfo?.cpf}, com o endereço ${contratanteInfo?.endereco}`;

  const contratadoInfo = contract?.details?.contratado;
  const contratadoText = contratadoInfo?.contratado_natureza === 'pj'
    ? `${contratadoInfo?.razao_social}, CNPJ ${contratadoInfo?.cnpj}, com sede em ${contratadoInfo?.endereco}`
    : `${contratadoInfo?.nome_completo}, CPF ${contratadoInfo?.cpf}, com o endereço ${contratadoInfo?.endereco}`;

  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.header}>Contrato de Prestação de Serviços de {contract?.details?.contrato?.servico_prestado}</Text>

        <Text style={styles.sectionTitle}>Contratado:</Text>
        <Text style={styles.text}>{contratadoText}</Text>

        <Text style={styles.separator}></Text>

        <Text style={styles.sectionTitle}>Contratante:</Text>
        <Text style={styles.text}>{contratanteText}</Text>

        <Text style={styles.separator}></Text>

        <Text style={styles.sectionTitle}>Serviço Prestado:</Text>
        <Text style={styles.text}>{contract?.details?.contrato?.servico_prestado}</Text>

        <Text style={styles.separator}></Text>

        <Text style={styles.sectionTitle}>Detalhes de Pagamento:</Text>
        <Text style={styles.text}>Valor do Serviço: R$ {contract?.details?.pagamento?.valor_servico}</Text>
        <Text style={styles.text}>Pagamento: {contract?.details?.pagamento?.pagamento_unico_ou_recorrente}</Text>
        {contract?.details?.pagamento?.pagamento_unico_ou_recorrente === 'recorrente' && (
          <>
            <Text style={styles.text}>Quantas Vezes: {contract?.details?.pagamento?.quantas_vezes}</Text>
            <Text style={styles.text}>Valor de cada Pagamento: R$ {contract?.details?.pagamento?.valor_de_cada_pagamento}</Text>
          </>
        )}

        <Text style={styles.separator}></Text>

        <Text style={styles.sectionTitle}>Cláusulas:</Text>
        {contract?.details?.clausulas.map((clausula, index) => (
          <View key={index}>
            <Text style={styles.textBold}>{clausula.nome}</Text>
            <Text style={styles.text}>{clausula.descricao}</Text>
          </View>
        ))}

        <Text style={styles.separator}></Text>

        {contract?.details?.testemunha?.tem_testemunhas === 'sim' && (
          <View>
            <Text style={styles.sectionTitle}>Testemunhas:</Text>
            <Text style={styles.text}>Primeira Testemunha: {contract?.details?.testemunha?.nome_primeira_testemunha}</Text>
            <Text style={styles.text}>CPF: {contract?.details?.testemunha?.cpf_primeira_testemunha}</Text>

            <Text style={styles.text}>Segunda Testemunha: {contract?.details?.testemunha?.nome_segunda_testemunha}</Text>
            <Text style={styles.text}>CPF: {contract?.details?.testemunha?.cpf_segunda_testemunha}</Text>
          </View>
        )}

        <Text style={styles.separator}></Text>

        <View style={styles.signatureSection}>
          <Text style={styles.signatureText}>Assinado em {contract?.details?.assinatura?.cidade_assinatura}, {contract?.details?.assinatura?.data_assinatura}</Text>
          <View style={styles.signatureLine}></View>
          <Text style={styles.signatureText}>Assinatura do Contratante</Text>

          <View style={styles.signatureLine}></View>
          <Text style={styles.signatureText}>Assinatura do Contratado</Text>
        </View>

        <Text style={styles.footer}>Contrato gerado por [Nome do Sistema] - [Data]</Text>
      </Page>
    </Document>
  );
};
