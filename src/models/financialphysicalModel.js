import prisma from "./connectionModel.js";

export const getFinancialPhysicalReport = async (workId) => {
  const dadosBrutos = await prisma.physicalSchedule.findMany({
    where: {
      id_work: Number(workId),
    },
    include: {
      work: {
        select: {
          budget: true, 
        },
      },
      stage: {
        select: {
          id_stage: true,
          name: true,
        },
      },
      substageSchedules: {
        include: {
          substage: {
            include: {
              substageStocks: { 
                include: {
                  materialStock: true, 
                },
              },
            },
          },
        },
      },
    },
  });

  let totalObraAcumulado = 0;
  let valorContrato = dadosBrutos.length > 0 && dadosBrutos[0].work.budget ? Number(dadosBrutos[0].work.budget) : 0;

  const reportData = dadosBrutos.map((schedule) => {
    let totalCustoEtapa = 0;
    const distribuicaoMensal = {}; 

    schedule.substageSchedules.forEach((subSched) => {
      if (!subSched.expStartDate || !subSched.expEndDate) return;

      let custoSubetapa = 0;
      if (subSched.substage.substageStocks) {
        subSched.substage.substageStocks.forEach((item) => {
          const qtd = Number(item.quantityUsed) || 0;
          const custoUnitario = Number(item.materialStock?.costUnit) || 0;
          custoSubetapa += qtd * custoUnitario;
        });
      }

      totalCustoEtapa += custoSubetapa;

      const dataInicio = new Date(subSched.expStartDate);
      const dataFim = new Date(subSched.expEndDate);
      
      const mesesDuracao =
        (dataFim.getFullYear() - dataInicio.getFullYear()) * 12 +
        (dataFim.getMonth() - dataInicio.getMonth()) +
        1;

      const valorPorMes = mesesDuracao > 0 ? custoSubetapa / mesesDuracao : custoSubetapa;

      for (let i = 0; i < mesesDuracao; i++) {

        const dataAtual = new Date(dataInicio.getFullYear(), dataInicio.getMonth() + i, 1);
        
        const mesAnoChave = dataAtual.toLocaleString("pt-BR", { month: "short", year: "2-digit" }); 
        
        if (!distribuicaoMensal[mesAnoChave]) {
          distribuicaoMensal[mesAnoChave] = 0;
        }
        distribuicaoMensal[mesAnoChave] += valorPorMes;
      }
    });

    totalObraAcumulado += totalCustoEtapa;

    const cronogramaFormatado = Object.keys(distribuicaoMensal).map((mes) => {
      const valorMes = distribuicaoMensal[mes];
      const percentual = totalCustoEtapa > 0 ? (valorMes / totalCustoEtapa) * 100 : 0;
      
      return {
        mes: mes, 
        valor: valorMes.toFixed(2), 
        porcentagem: percentual.toFixed(0) + "%", 
        valor_bruto: valorMes 
      };
    });
    return {
      id_etapa: schedule.stage.id_stage,
      nome_etapa: schedule.stage.name,
      total_etapa: totalCustoEtapa.toFixed(2),
      cronograma_financeiro: cronogramaFormatado,
    };
  });
  return {
    resumo: {
      valor_contrato: valorContrato.toFixed(2),
      valor_disponivel: (valorContrato - totalObraAcumulado).toFixed(2),
      total_acumulado_obra: totalObraAcumulado.toFixed(2),
    },
    tabela_dados: reportData,
  };
};