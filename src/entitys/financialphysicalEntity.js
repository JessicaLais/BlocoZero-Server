export default class FinancialPhysicalReport {
  constructor({ resumo, tabela_dados }) {
    this.resumo = {
      valor_contrato: resumo?.valor_contrato || "0.00",
      valor_disponivel: resumo?.valor_disponivel || "0.00",
      total_acumulado_obra: resumo?.total_acumulado_obra || "0.00",
    };
    this.tabela_dados = tabela_dados || [];
    this.validate();
  }

  validate = () => {
    if (!this.resumo || typeof this.resumo !== "object") {
      throw new Error("Financial Report: Missing 'resumo' data");
    }
    if (!Array.isArray(this.tabela_dados)) {
      throw new Error("Financial Report: 'tabela_dados' must be an array");
    }
  };
}