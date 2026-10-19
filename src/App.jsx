import React, { useEffect, useRef, useState } from "react";
import { Bug, Rat, Droplets, Worm, Printer, Save, FileText, Trash2, RefreshCw } from "lucide-react";
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
const hoje = () => { const t = new Date(); return `${t.getFullYear()}-${pad(t.getMonth() + 1)}-${pad(t.getDate())}`; };
const store = {
  get(k, f) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : f; } catch (e) { return f; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} },
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
    <div className="min-h-[1123px] w-[794px] bg-white px-[46px] pb-[30px] pt-[46px] text-center font-[Arial,Helvetica,sans-serif] text-[12.5px] leading-[1.3] text-[#0b2a5b] print:min-h-[297mm] print:w-[210mm]">
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
  const [f, setF] = useState({
    nome: "BAR E BOTEQUIM RIO VERMELHO LTDA", cnpj: "53.529.710/0001-70",
    end: "DA FONTE DO BOI, 32, LOJA 01, RIO VERMELHO", cid: "Salvador - BA, 40440-360",
    data: hoje(), meses: 3, servicos: [true, true, false, false],
  });
  const [clientes, setClientes] = useState(() => store.get("cert_clientes", []));
  const [sel, setSel] = useState("");
  const [tab, setTab] = useState("dados");
  const [scale, setScale] = useState(1);
  const box = useRef(null);
  const set = (k, v) => setF(p => ({ ...p, [k]: v }));
  const bind = k => ({ id: k, value: f[k], onChange: e => set(k, e.target.value) });

  useEffect(() => {
    const fit = () => { const w = box.current && box.current.clientWidth; if (w) setScale(Math.max(0.3, Math.min(1, (w - 48) / 794))); };
    fit();
    const ro = new ResizeObserver(fit); ro.observe(box.current);
    return () => ro.disconnect();
  }, []);

  const persist = l => { setClientes(l); store.set("cert_clientes", l); };
  const dados = () => ({ nome: f.nome, cnpj: f.cnpj, end: f.end, cid: f.cid });
  const salvar = () => { const c = dados(); persist(clientes.filter(x => x.cnpj !== c.cnpj).concat(c)); setSel(c.cnpj); };
  const atualizar = () => {
    if (!sel) return;
    const c = dados();
    persist(clientes.filter(x => x.cnpj === sel || x.cnpj !== c.cnpj).map(x => (x.cnpj === sel ? c : x)));
    setSel(c.cnpj);
  };
  const remover = () => { if (!sel) return; persist(clientes.filter(x => x.cnpj !== sel)); setSel(""); };
  const carregar = cnpj => { const c = clientes.find(x => x.cnpj === cnpj); if (c) { setF(p => ({ ...p, ...c })); setSel(cnpj); } };
  const imprimir = () => window.print();
  const marcados = f.servicos.map((v, i) => (v ? String(i) : null)).filter(Boolean);

  return (
    <Tabs value={tab} onValueChange={setTab}>
      <header className="sticky top-0 z-20 flex items-center gap-3 rounded-b-2xl bg-background/90 shadow-neu-sm px-4 pb-2.5 pt-[calc(0.625rem+env(safe-area-inset-top))] backdrop-blur print:hidden">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-neu-sm"><FileText className="h-5 w-5" /></div>
        <div className="leading-tight"><b className="block text-[15px]">Certificados de Garantia</b><span className="hidden text-xs text-muted-foreground sm:block">Max Control · Desinsetizadora</span></div>
        <TabsList className="ml-auto lg:hidden">
          <TabsTrigger value="dados">Dados</TabsTrigger>
          <TabsTrigger value="previa">Prévia</TabsTrigger>
        </TabsList>
      </header>

      <main className="mx-auto grid max-w-[1440px] items-start gap-5 p-3 pb-28 lg:grid-cols-[400px_1fr] lg:p-5 print:block print:p-0">
        <TabsContent value="dados" forceMount className="m-0 space-y-4 lg:!block print:!hidden">
          <Card>
            <CardHeader><CardTitle>Cliente</CardTitle></CardHeader>
            <CardContent>
              <Field label="Clientes salvos">
                <div className="flex gap-2">
                  <Select value={sel} onValueChange={carregar} disabled={!clientes.length}>
                    <SelectTrigger className="min-w-0 flex-1"><SelectValue placeholder={clientes.length ? "Selecionar cliente…" : "Nenhum cliente salvo"} /></SelectTrigger>
                    <SelectContent>{clientes.map(c => <SelectItem key={c.cnpj} value={c.cnpj}>{c.nome}</SelectItem>)}</SelectContent>
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
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Serviço</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <Field id="data" label="Data do serviço"><Input type="date" {...bind("data")} /></Field>
                <Field id="meses" label="Garantia (meses)"><Input type="number" inputMode="numeric" min="1" {...bind("meses")} /></Field>
              </div>
              <Field label="Serviços realizados">
                <ToggleGroup type="multiple" value={marcados} onValueChange={v => set("servicos", SERV.map((_, i) => v.includes(String(i))))}>
                  {SERV.map((s, i) => <ToggleGroupItem key={i} value={String(i)}><s.Ic className="h-5 w-5 shrink-0" />{s.nome}</ToggleGroupItem>)}
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
