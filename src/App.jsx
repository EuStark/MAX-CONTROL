import React, { useEffect, useRef, useState } from "react";
import { Bug, Rat, Droplets, Worm, Printer, Save, FileText, Trash2, RefreshCw, History, RotateCcw } from "lucide-react";
import mascote from "./mascote";
import { Button } from "./components/ui/button";
import { Input, Textarea } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "./components/ui/toggle-group";

const MES = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
const pad = n => (n < 10 ? "0" : "") + n;
const parse = s => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); };
const br = d => `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
const ext = d => `${d.getDate()} de ${MES[d.getMonth()]} de ${d.getFullYear()}`;
const addMonths = (d, n) => { let r = new Date(d.getFullYear(), d.getMonth() + n, d.getDate()); if (r.getDate() !== d.getDate()) r = new Date(d.getFullYear(), d.getMonth() + n + 1, 0); return r; };
const vazio = () => ({ nome: "", cnpj: "", end: "", cid: "", data: "", meses: "", servicos: [false, false, false, false] });
const api = async (url, options) => {
  const response = await fetch(url, { credentials: "same-origin", ...options });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body.error || "Não foi possível concluir a operação.");
  return body;
};
const SERV = [
  { nome: "Desinsetização", Ic: Bug, base: "Amido Hidrazonas.", anti: "Tratamento Sintomático.", total: "30g.", prop: "30g." },
  { nome: "Desratização", Ic: Rat, base: "Brodifacoun.", anti: "Vitamina K I Injetável.", total: "400g.", prop: "25g para cada 25 m2." },
  { nome: "Controle de Mosquito", Ic: Droplets, base: "Piretroide.", anti: "Tratamento Sintomático.", total: "200 ml.", prop: "50 ml para cada 05 litros de água." },
  { nome: "Desformigação", Ic: Worm, base: "Oxadizina.", anti: "Tratamento Sintomático.", total: "10g.", prop: "10g." },
];

const BORDA = "border border-[#6b8cc4]";
const CLI = "my-[3px] text-[17px] font-bold";

function Sheet({ f }) {
  const nomes = SERV.filter((_, i) => f.servicos[i]).map(s => s.nome).join(" e ");
  const d = f.data ? parse(f.data) : null;
  const n = parseInt(f.meses, 10) || 3;
  const cell = i => { const s = SERV[i]; return (
    <div key={i} className={`${BORDA} px-[9px] py-1.5 text-[13px]`}>
      <h3 className="mb-[3px] text-base font-bold">{f.servicos[i] ? "(x) " : "( ) "}{s.nome}:</h3>
      Base Química do Produto: {s.base}<br />Antídoto do Produto: {s.anti}<br />
      Quantidade Total do Produto Utilizado: por área: {s.total}<br />Proporção do Produto Utilizado por área: {s.prop}
    </div>); };
  return (
    <div className="certificate-sheet min-h-[1123px] w-[794px] bg-white px-[46px] pb-[30px] pt-[46px] text-center font-[Arial,Helvetica,sans-serif] text-[12.5px] leading-[1.3] text-[#0b2a5b] print:min-h-[297mm] print:w-[210mm]">
      <div className="relative flex min-h-[136px] items-center justify-center">
        <div className="absolute left-1.5 top-0 h-[136px] w-[118px]">
          <img src={mascote} alt="Mascote" className="h-full w-full object-contain mix-blend-multiply" />
        </div>
        <div className="w-full px-[130px]">
          <h1 className="text-[21px] font-normal italic">MAX CONTROL – DESINSETIZADORA</h1>
          <p className="my-[3px] text-[13.5px]">Desinsetização – Desratização – Descupinização<br />Despulgação – Sanitização – Lavagem de Caixas d’água.</p>
          <p className="my-[3px] text-[13.5px]"><b>Responsável: GUSTAVO SANTANA</b></p>
        </div>
      </div>
      <div className="mb-5 mt-6 text-[30px] font-bold underline">CERTIFICADO DE GARANTIA.</div>
      <div className={CLI}>A</div>
      <div className={`${CLI} text-lg`}>{f.nome.toUpperCase()}</div>
      <div className={CLI}>CNPJ: {f.cnpj}</div>
      <div className={`${CLI} text-lg`}>{f.end.toUpperCase()}</div>
      <div className={`${CLI} text-base`}>{f.cid}</div>
      <div className="mb-1 mt-3.5 text-base font-bold">Nesta.</div>
      <div className="mb-1 text-base font-bold">
        Atestamos para os devidos fins, que fora realizado no dia {d ? ext(d) : "—"}, o serviço de: {nomes} em toda área necessária da unidade. Conforme normas e padrões técnicos.
      </div>
      <div className={`mt-2 grid grid-cols-2 ${BORDA}`}>
        {cell(0)}{cell(2)}{cell(1)}{cell(3)}
        <div className={`${BORDA} px-[9px] py-1.5 text-[13.5px] font-bold [&>p]:mb-4`}><u>INSTRUÇÕES:</u>
          <p>1)-Todos os locais necessários deverão ser vaporizados para evitar focos.</p>
          <p>2)- O Cliente deverá permitir que operador vaporize todos os locais.</p>
          <p>3)- As partes tais como: cozinha, área de serviço e sanitários não deverão ser lavados durante 3 dias.</p>
          <p>4)- Após a execução dos serviços é comum surgirem alguns insetos que não permanecerão, caso continuem após 30 dias repetimos o processo dentro do prazo de garantia.</p>
        </div>
        <div className={`${BORDA} px-[9px] py-1.5 text-[13.5px] font-bold [&>p]:mb-4`}>
          <p>5)- Em caso de acidente PROCURAR UMA EMERGÊNCIA MÉDICA – TEL: CIAVE(**71) 3387-4343/0800 2844343 VIGILÂNCIA SANITÁRIA: 3611-6418.</p>
          <p>6)- Crianças pessoas alérgicas, idosas e animais deverão se ausentar por 24 horas.</p>
          <p>7)- Processo com gel não é necessário se ausentar do ambiente.</p>
        </div>
      </div>
      <div className="mt-2 text-lg font-bold">Garantia do serviço: {nomes}<br />Validade: De {d ? br(d) : "—"} Á {d ? br(addMonths(d, n)) : "—"}</div>
      <div className="mt-6 text-sm">Salvador, {d ? ext(d) : "—"}
        <small className="block text-[11.5px]">Avenida Jorge Amado, 5 - Casa - Imbui - Salvador/BA<br />Tel.: (71) 99736-5510</small>
      </div>
    </div>
  );
}

const Field = ({ id, label, children }) => <div className="space-y-1.5"><Label htmlFor={id}>{label}</Label>{children}</div>;

export default function App() {
  const [f, setF] = useState(vazio);
  const [clientes, setClientes] = useState([]);
  const [historico, setHistorico] = useState([]);
  const [sel, setSel] = useState("");
  const [tab, setTab] = useState("dados");
  const [scale, setScale] = useState(1);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [autenticado, setAutenticado] = useState(false);
  const [senha, setSenha] = useState("");
  const [erroLogin, setErroLogin] = useState("");
  const box = useRef(null);
  const set = (k, v) => setF(p => ({ ...p, [k]: v }));
  const bind = k => ({ id: k, value: f[k], onChange: e => set(k, e.target.value) });

  const atualizarListas = async () => {
    const [cs, hs] = await Promise.all([api("/api/clientes"), api("/api/auditoria")]);
    setClientes(cs); setHistorico(hs);
  };

  useEffect(() => {
    api("/api/login").then(async session => {
      setAutenticado(session.authenticated);
      if (session.authenticated) await atualizarListas();
      else if (!session.configured) setErroLogin("Configure APP_PASSWORD na Vercel para proteger o sistema.");
    }).catch(e => setErroLogin(e.message)).finally(() => setCarregando(false));
  }, []);

  useEffect(() => {
    if (!autenticado || !box.current) return;
    const fit = () => { const w = box.current && box.current.clientWidth; if (w) setScale(Math.max(0.3, Math.min(1, (w - 48) / 794))); };
    fit();
    const ro = new ResizeObserver(fit); ro.observe(box.current);
    return () => ro.disconnect();
  }, [autenticado]);

  const dados = () => ({ nome: f.nome, cnpj: f.cnpj, end: f.end, cid: f.cid });
  const executar = async acao => {
    setErro(""); setMensagem("");
    try { await acao(); await atualizarListas(); }
    catch (e) { setErro(e.message); }
  };
  const validar = () => {
    if (!f.nome.trim() || !f.cnpj.trim()) throw new Error("Preencha pelo menos a empresa e o CNPJ.");
  };
  const salvar = () => executar(async () => {
    validar();
    const c = await api("/api/clientes", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(dados()) });
    setSel(c.id); setMensagem("Cliente salvo e registrado no histórico.");
  });
  const atualizar = () => executar(async () => {
    if (!sel) return;
    validar();
    const c = await api(`/api/clientes?id=${encodeURIComponent(sel)}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(dados()) });
    setSel(c.id); setMensagem("Cliente atualizado e alteração registrada.");
  });
  const remover = () => executar(async () => {
    if (!sel) return;
    await api(`/api/clientes?id=${encodeURIComponent(sel)}`, { method: "DELETE" });
    setSel(""); setF(vazio()); setMensagem("Cliente apagado e exclusão registrada.");
  });
  const carregar = id => { const c = clientes.find(x => x.id === id); if (c) { setF(p => ({ ...p, ...c })); setSel(id); setErro(""); setMensagem(""); } };
  const imprimir = () => executar(async () => {
    await api("/api/auditoria", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ acao: "certificado_impresso", cliente: dados(), certificado: { data: f.data, meses: f.meses, servicos: SERV.filter((_, i) => f.servicos[i]).map(s => s.nome) } }) });
    setMensagem("Impressão registrada no histórico.");
    window.print();
  });
  const novo = () => { setF(vazio()); setSel(""); setErro(""); setMensagem("Campos limpos para um novo certificado."); };
  const entrar = async event => {
    event.preventDefault(); setErroLogin("");
    try { await api("/api/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password: senha }) }); setAutenticado(true); setSenha(""); await atualizarListas(); }
    catch (e) { setErroLogin(e.message); }
  };
  const sair = async () => { await api("/api/login", { method: "DELETE" }); setAutenticado(false); setF(vazio()); setSel(""); };
  const marcados = f.servicos.map((v, i) => (v ? String(i) : null)).filter(Boolean);

  if (carregando) return <div className="grid min-h-screen place-items-center text-muted-foreground">Carregando sistema…</div>;
  if (!autenticado) return <main className="grid min-h-screen place-items-center p-4"><Card className="w-full max-w-md"><CardHeader><CardTitle>Acesso ao sistema</CardTitle></CardHeader><CardContent><form onSubmit={entrar} className="space-y-4"><Field id="senha" label="Senha de acesso"><Input id="senha" type="password" autoComplete="current-password" value={senha} onChange={e => setSenha(e.target.value)} required /></Field><Button type="submit" className="w-full">Entrar</Button>{erroLogin && <p role="alert" className="text-sm text-red-600">{erroLogin}</p>}</form></CardContent></Card></main>;

  return (
    <Tabs value={tab} onValueChange={value => { setTab(value); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
      <header className="sticky top-0 z-20 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 rounded-b-2xl bg-background/90 shadow-neu-sm px-4 pb-2.5 pt-[calc(0.625rem+env(safe-area-inset-top))] backdrop-blur print:hidden">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-neu-sm"><FileText className="h-5 w-5" /></div>
        <div className="min-w-0 leading-tight"><b className="block text-[15px]">Certificados de Garantia</b><span className="hidden text-xs text-muted-foreground sm:block">Max Control · Desinsetizadora</span></div>
        <Button variant="ghost" className="px-2" onClick={sair}>Sair</Button>
        <TabsList className="col-span-3 grid w-full grid-cols-2 lg:hidden">
          <TabsTrigger value="dados" className="w-full">Preencher</TabsTrigger>
          <TabsTrigger value="previa" className="w-full">Ver certificado</TabsTrigger>
        </TabsList>
      </header>

      <main className="mx-auto grid max-w-[1440px] items-start gap-5 p-3 pb-28 lg:grid-cols-[400px_1fr] lg:p-5 print:block print:p-0">
        <TabsContent value="dados" forceMount className="m-0 space-y-4 lg:!block print:!hidden"><p className="rounded-lg bg-muted px-3 py-2 text-sm text-muted-foreground lg:hidden">Preencha os campos abaixo. Toque em “Ver certificado” para conferir antes de imprimir.</p>
          <Card>
            <CardHeader><CardTitle>Cliente</CardTitle></CardHeader>
            <CardContent>
              <Field label="Clientes salvos">
                <div className="flex gap-2">
                  <Select value={sel} onValueChange={carregar} disabled={!clientes.length}>
                    <SelectTrigger className="min-w-0 flex-1"><SelectValue placeholder={carregando ? "Carregando…" : clientes.length ? "Selecionar cliente…" : "Nenhum cliente salvo"} /></SelectTrigger>
                    <SelectContent>{clientes.map(c => <SelectItem key={c.id} value={c.id}>{c.nome} · {c.cnpj}</SelectItem>)}</SelectContent>
                  </Select>
                  <Button variant="outline" className="shrink-0 px-3" onClick={remover} disabled={!sel} aria-label="Remover cliente salvo"><Trash2 className="h-4 w-4" /></Button>
                </div>
              </Field>
              <Field id="nome" label="Empresa"><Input {...bind("nome")} /></Field>
              <Field id="cnpj" label="CNPJ"><Input inputMode="numeric" {...bind("cnpj")} /></Field>
              <Field id="end" label="Endereço"><Textarea rows={2} {...bind("end")} /></Field>
              <Field id="cid" label="Cidade / UF / CEP"><Input {...bind("cid")} /></Field>
              <div className="flex gap-2 pt-1">
                <Button variant="outline" className="flex-1 px-3" onClick={salvar}><Save className="h-4 w-4" />Salvar cliente</Button>
                <Button className="flex-1 px-3" onClick={atualizar} disabled={!sel}><RefreshCw className="h-4 w-4" />Atualizar cliente</Button>
              </div>
              <Button variant="ghost" className="mt-2 w-full" onClick={novo}><RotateCcw className="h-4 w-4" />Novo certificado / Limpar campos</Button>
              {(erro || mensagem) && <p role="status" className={`mt-2 text-sm ${erro ? "text-red-600" : "text-emerald-700"}`}>{erro || mensagem}</p>}
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle><span className="inline-flex items-center gap-2"><History className="h-4 w-4" />Histórico de atividades</span></CardTitle></CardHeader>
            <CardContent className="max-h-72 space-y-2 overflow-auto text-sm">
              {historico.length ? historico.map(h => <div key={h.id} className="border-b border-border pb-2"><b>{({ cliente_criado: "Cliente salvo", cliente_atualizado: "Cliente atualizado", cliente_apagado: "Cliente apagado", certificado_impresso: "Certificado impresso" })[h.acao] || h.acao}</b><div>{h.cliente?.nome || "Sem nome"}{h.cliente?.cnpj ? ` · ${h.cliente.cnpj}` : ""}</div><time className="text-xs text-muted-foreground">{new Date(h.created_at).toLocaleString("pt-BR")}</time>{(h.antes || h.depois) && <details className="mt-1"><summary className="cursor-pointer text-xs">Ver dados registrados</summary>{h.antes && <div className="mt-1"><b>Antes</b><pre className="overflow-auto whitespace-pre-wrap text-xs">{JSON.stringify(JSON.parse(h.antes), null, 2)}</pre></div>}{h.depois && <div className="mt-1"><b>Depois / certificado</b><pre className="overflow-auto whitespace-pre-wrap text-xs">{JSON.stringify(JSON.parse(h.depois), null, 2)}</pre></div>}</details>}</div>) : <p className="text-muted-foreground">{carregando ? "Carregando histórico…" : "Nenhuma atividade registrada."}</p>}
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Serviço</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Field id="data" label="Data do serviço"><Input type="date" {...bind("data")} /></Field>
                <Field id="meses" label="Garantia (meses)"><Input type="number" inputMode="numeric" min="1" {...bind("meses")} /></Field>
              </div>
              <Field label="Serviços realizados">
                <ToggleGroup type="multiple" value={marcados} className="flex flex-wrap gap-2" onValueChange={v => set("servicos", SERV.map((_, i) => v.includes(String(i))))}>
                  {SERV.map((s, i) => <ToggleGroupItem key={i} value={String(i)} className="h-auto min-h-10 w-[calc(50%-0.25rem)] justify-start whitespace-normal px-2 py-2 text-left"><s.Ic className="h-5 w-5 shrink-0" />{s.nome}</ToggleGroupItem>)}
                </ToggleGroup>
              </Field>
            </CardContent>
          </Card>
          <Button size="lg" className="hidden w-full lg:inline-flex" onClick={imprimir}><Printer className="h-5 w-5" />Imprimir / Salvar PDF</Button>
        </TabsContent>

        <TabsContent value="previa" forceMount className="m-0 lg:!block print:!block">
          <div ref={box} className="overflow-hidden rounded-2xl bg-background p-3 shadow-neu-in sm:p-5 print:block print:!h-auto print:rounded-none print:bg-white print:p-0 print:shadow-none" style={{ height: 1123 * scale + 48 }}>
            <div className="mx-auto print:!h-auto print:!w-auto" style={{ width: 794 * scale, height: 1123 * scale }}>
              <div className="shadow-[5px_5px_16px_var(--sh-d)] print:![transform:none] print:!w-auto print:shadow-none" style={{ transform: `scale(${scale})`, transformOrigin: "top left", width: 794 }}><Sheet f={f} /></div>
            </div>
          </div>
        </TabsContent>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-20 flex gap-2 rounded-t-2xl bg-background shadow-[0_-6px_16px_var(--sh-d)] p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] lg:hidden print:hidden">
        <Button className="flex-1" onClick={imprimir}><Printer className="h-4 w-4" />Imprimir / PDF</Button>
      </div>
    </Tabs>
  );
}
