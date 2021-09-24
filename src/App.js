import React, { useState } from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import styled from "styled-components";

/*
create-react-app testereact 
cd testereact 
npm install @material-ui/core --save
npm install styled-components --save
*/

const estadoInicial = {
  cpf: "129891212",
  nome: "Fulano da Silva",
  contratoSelecionadoNumero: "",
  contratoSelecionado: null,
  numeroParcelasSelecionadas: 0,
  valorEntradaSelecionada: 0,
  contratos: [
    {
      numero: "0121112/33",
      valor: 300.0,
      vencimento: "2021-01-13",
    },
    {
      numero: "02424242/33",
      valor: 600.0,
      vencimento: "2021-01-13",
    },
    {
      numero: "034343434/33",
      valor: 1000.0,
      vencimento: "2021-01-13",
    },
  ],
};

function App() {
  const [estadoApp, setEstadoApp] = useState(estadoInicial);
  const {
    cpf,
    nome,
    contratoSelecionado,
    contratoSelecionadoNumero,
    contratos,
    numeroParcelasSelecionadas,
    valorEntradaSelecionada,
  } = estadoApp;

  let vencimentoContratoSelecionado = "";
  let valorContratoSelecionado = 0;
  let numeroParcelas = 0;
  let entradaMinima = 0;

  if (contratoSelecionado) {
    vencimentoContratoSelecionado = contratoSelecionado.vencimento;
    valorContratoSelecionado = contratoSelecionado.valor;
    if (valorContratoSelecionado < 500) {
      numeroParcelas = 3;
      entradaMinima = valorContratoSelecionado / 3;
    } else if (valorContratoSelecionado < 1000) {
      numeroParcelas = 4;
      entradaMinima = valorContratoSelecionado / 4;
    } else if (valorContratoSelecionado < 2000) {
      numeroParcelas = 5;
      entradaMinima = valorContratoSelecionado / 6;
    }
  }

  console.log(estadoApp);
  let parcelasParaGerar = [];
  for (let x = 0; x < numeroParcelas; x++) {
    parcelasParaGerar.push(x + 1);
  }

  let PropostaEstaOk = true;
  let mensagemDeErro = "";

  if (valorEntradaSelecionada === 0) {
    PropostaEstaOk = false;
  }

  if (valorEntradaSelecionada > 0 && valorEntradaSelecionada < entradaMinima) {
    mensagemDeErro = `ERRO! O valor minimo da entrada eh de R$ ${entradaMinima}`;
    PropostaEstaOk = false;
  }

  let ParcelasParaMostrar = [];

  if (PropostaEstaOk) {
    for (let x = 0; x < numeroParcelasSelecionadas; x++) {
      ParcelasParaMostrar.push({
        numeroParcela: x + 1,
        valorParcela:
          (valorContratoSelecionado - valorEntradaSelecionada) /
          numeroParcelasSelecionadas,
      });
    }
  }

  console.log(ParcelasParaMostrar);

  const TelaParaAcordo = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 500px;
    max-width: 500px;
    background: #eeeeee;
    margin: 50px;
  `;

  const HeaderAcordo = styled.div`
    display: flex;
    width: 100%;
  `;

  const ColunaAcordo = styled.div`
    flex: 1;
  `;

  const CampoColunaAcordo = styled.div`
    color: #ffffff;
    background: #000000;
    text-align: center;
  `;

  const ValorColunaAcordo = styled.div`
    text-align: center;
  `;

  const PanelSelecionarContrato = styled.div`
    width: 100%;
    display: flex;
    margin-top: 20px;
  `;

  const CampoSelecionarContrato = styled.div`
    flex: 1;
  `;

  const InformacoesContrato = styled.div`
    margin-top: 20px;
  `;

  const SelecionarNumeroParcelas = styled.div`
    display: flex;
    margin-top: 20px;
  `;

  const CampoSelecionarNumeroParcelas = styled.div`
    flex: 1;
  `;

  const EntrarValorEntrada = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
  `;

  const AvisoEntradaMinima = styled.div`
    color: red;
    flex: 1;
    text-align: center;
    font-weight: 700;
  `;

  const MensagemErro = styled.div`
    width: 100%;
    text-align: center;
    margin-top: 30px;
    margin-bottom: 30px;
    color: red;
    font-weight: 800;
    font-size: 20px;
  `;

  const PlanoDeParcelamento = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    margin-top: 30px;
    margin-bottom: 30px;
  `;

  const CampoValorEntrada = styled.div`
    display: flex;
    align-items:end;
  `;

  const CampoEntrada = styled.div`
  flex:1;
  `;

  return (
    <TelaParaAcordo>
      <HeaderAcordo>
        <ColunaAcordo>
          <CampoColunaAcordo>CPF</CampoColunaAcordo>
          <ValorColunaAcordo>{cpf}</ValorColunaAcordo>
        </ColunaAcordo>
        <ColunaAcordo>
          <CampoColunaAcordo>Nome</CampoColunaAcordo>
          <ValorColunaAcordo>{nome}</ValorColunaAcordo>
        </ColunaAcordo>
      </HeaderAcordo>
      <PanelSelecionarContrato>
        <CampoSelecionarContrato>Contrato:</CampoSelecionarContrato>
        <CampoSelecionarContrato>
          <Select
            value={contratoSelecionadoNumero}
            onChange={(e) => {
              const contratoSelecionado = contratos.filter(
                (x) => x.numero === e.target.value
              )[0];

              setEstadoApp({
                ...estadoApp,
                contratoSelecionadoNumero: contratoSelecionado.numero,
                contratoSelecionado: contratoSelecionado,
              });
            }}
          >
            {contratos.map((x) => {
              return (
                <MenuItem key={`${x.numero}${x.vencimento}`} value={x.numero}>
                  {`${x.vencimento} - Numero:${x.numero} - Valor:R$ ${x.valor}`}
                </MenuItem>
              );
            })}
          </Select>
        </CampoSelecionarContrato>
      </PanelSelecionarContrato>
      {contratoSelecionado && (
        <InformacoesContrato>
          <div>
            {`O valor do contrato Selecionado é de R$ ${valorContratoSelecionado}`}
          </div>
          <div>
            {`O vencimento do contrato Selecionado é de R$ ${vencimentoContratoSelecionado}`}
          </div>
          <SelecionarNumeroParcelas>
            <CampoSelecionarNumeroParcelas>
              Numero Parcelas:
            </CampoSelecionarNumeroParcelas>
            <CampoSelecionarNumeroParcelas>
              <Select
                value={numeroParcelasSelecionadas}
                onChange={(e) => {
                  setEstadoApp({
                    ...estadoApp,
                    numeroParcelasSelecionadas: e.target.value,
                  });
                }}
              >
                {parcelasParaGerar.map((x) => {
                  return (
                    <MenuItem key={`Parcela${x}`} value={x}>
                      {`${x} Parcela(s)`}
                    </MenuItem>
                  );
                })}
              </Select>
            </CampoSelecionarNumeroParcelas>
          </SelecionarNumeroParcelas>
        </InformacoesContrato>
      )}
      {numeroParcelasSelecionadas > 0 && (
        <EntrarValorEntrada>
          <CampoValorEntrada>
            <CampoEntrada>Valor Entrada:</CampoEntrada>
            <CampoEntrada>
              <TextField
                label={"Valor Entrada"}
                value={valorEntradaSelecionada}
                onChange={(e) =>
                  setEstadoApp({
                    ...estadoApp,
                    valorEntradaSelecionada: e.target.value,
                  })
                }
              />
            </CampoEntrada>
          </CampoValorEntrada>
          <AvisoEntradaMinima>
            {`Entrada Minima eh R$ ${entradaMinima}`}
          </AvisoEntradaMinima>
        </EntrarValorEntrada>
      )}
      {PropostaEstaOk && (
        <PlanoDeParcelamento>
          <div>{`Entrada de R$ ${valorEntradaSelecionada}`}</div>
          {ParcelasParaMostrar.map((x) => {
            return (
              <div>{`Parcela ${x.numeroParcela} - R$ ${x.valorParcela}`}</div>
            );
          })}
        </PlanoDeParcelamento>
      )}
      {!PropostaEstaOk && <MensagemErro>{mensagemDeErro}</MensagemErro>}
      {PropostaEstaOk && <Button variant="contained">Salvar Proposta</Button>}
    </TelaParaAcordo>
  );
}

export default App;
