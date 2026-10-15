import { ReactNode, useState } from "react";
import { RATES } from "./seo.js";

// Interactive calculators for the /tools pages. Each one is self-contained and
// runs entirely in the browser — nothing is sent anywhere.

const gbp = (n: number) => "£" + (Math.round(n * 100) / 100).toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const num = (v: string) => { const n = parseFloat(v); return isFinite(n) ? n : 0; };
const hrs = (n: number) => `${Math.round(n * 100) / 100} hrs`;

function Field({ label, children, hint }: { label: string; children: ReactNode; hint?: string }) {
  return <label className="toolfield"><span>{label}</span>{children}{hint && <small>{hint}</small>}</label>;
}
function Result({ items, tone = "" }: { items: [string, string][]; tone?: string }) {
  return <div className={`toolresult ${tone}`}>{items.map(([k, v]) => <div key={k}><small>{k}</small><strong>{v}</strong></div>)}</div>;
}
function Verdict({ ok, children }: { ok: boolean; children: ReactNode }) {
  return <p className={`toolverdict ${ok ? "ok" : "warn"}`}>{children}</p>;
}

const MIN_RATES: Record<string, [string, number]> = {
  "21": ["21 and over", parseFloat(RATES.nlw.slice(1))],
  "18": ["18 to 20", parseFloat(RATES.r1820.slice(1))],
  "16": ["16 to 17", parseFloat(RATES.r1617.slice(1))],
  "app": ["Apprentice", parseFloat(RATES.apprentice.slice(1))],
};

function minutesBetween(start: string, end: string) {
  const [sh, sm] = start.split(":").map(Number), [eh, em] = end.split(":").map(Number);
  if ([sh, sm, eh, em].some(x => !isFinite(x))) return 0;
  let m = (eh * 60 + em) - (sh * 60 + sm);
  if (m <= 0) m += 24 * 60; // finishes the next day
  return m;
}

export function ShiftPayCalculator() {
  const [start, setStart] = useState("19:00");
  const [end, setEnd] = useState("07:00");
  const [brk, setBrk] = useState("30");
  const [paidBreak, setPaidBreak] = useState(false);
  const [rate, setRate] = useState("13.50");
  const [count, setCount] = useState("1");
  const total = minutesBetween(start, end);
  const paidMins = Math.max(0, total - (paidBreak ? 0 : num(brk)));
  const pay = paidMins / 60 * num(rate);
  const shifts = Math.max(1, Math.round(num(count)));
  return <div className="toolcard">
    <div className="toolgrid">
      <Field label="Start time"><input type="time" value={start} onChange={e => setStart(e.target.value)} /></Field>
      <Field label="Finish time"><input type="time" value={end} onChange={e => setEnd(e.target.value)} /></Field>
      <Field label="Break (minutes)"><input type="number" min="0" inputMode="numeric" value={brk} onChange={e => setBrk(e.target.value)} /></Field>
      <Field label="Hourly rate (£)"><input type="number" min="0" step="0.01" inputMode="decimal" value={rate} onChange={e => setRate(e.target.value)} /></Field>
      <Field label="Number of shifts like this"><input type="number" min="1" inputMode="numeric" value={count} onChange={e => setCount(e.target.value)} /></Field>
      <label className="toolcheck"><input type="checkbox" checked={paidBreak} onChange={e => setPaidBreak(e.target.checked)} /> My break is paid</label>
    </div>
    <Result items={[["Time on shift", hrs(total / 60)], ["Paid hours", hrs(paidMins / 60)], ["Pay per shift", gbp(pay)], ...(shifts > 1 ? [[`Pay for ${shifts} shifts`, gbp(pay * shifts)] as [string, string]] : [])]} />
    {num(rate) > 0 && num(rate) < MIN_RATES["21"][1] && <Verdict ok={false}>{gbp(num(rate))} an hour is below the {RATES.nlw} minimum for workers aged 21 and over. <a href="/tools/minimum-wage-checker">Check your pay period</a>.</Verdict>}
  </div>;
}

export function MinimumWageChecker() {
  const [age, setAge] = useState("21");
  const [hours, setHours] = useState("160");
  const [gross, setGross] = useState("2000");
  const [deduct, setDeduct] = useState("0");
  const min = MIN_RATES[age][1];
  const h = num(hours);
  const counted = num(gross) - num(deduct);
  const rate = h > 0 ? counted / h : 0;
  const ok = rate >= min - 0.005;
  return <div className="toolcard">
    <div className="toolgrid">
      <Field label="Your age band"><select value={age} onChange={e => setAge(e.target.value)}>{Object.entries(MIN_RATES).map(([k, [l, r]]) => <option key={k} value={k}>{l} ({gbp(r)})</option>)}</select></Field>
      <Field label="Hours worked in the pay period" hint="Include travel between sites and any required training."><input type="number" min="0" step="0.25" inputMode="decimal" value={hours} onChange={e => setHours(e.target.value)} /></Field>
      <Field label="Gross pay for the period (£)" hint="Before tax and NI. Leave out tips and expenses."><input type="number" min="0" step="0.01" inputMode="decimal" value={gross} onChange={e => setGross(e.target.value)} /></Field>
      <Field label="Deductions for work items (£)" hint="Uniform, SIA licence, training or equipment you paid for."><input type="number" min="0" step="0.01" inputMode="decimal" value={deduct} onChange={e => setDeduct(e.target.value)} /></Field>
    </div>
    {h > 0 && <>
      <Result items={[["Your real hourly rate", gbp(rate)], ["Legal minimum", gbp(min)], ["Minimum pay for these hours", gbp(min * h)]]} tone={ok ? "" : "bad"} />
      <Verdict ok={ok}>{ok ? "Your pay meets the minimum wage for this period." : `You may have been underpaid by about ${gbp(min * h - counted)} this period. Raise it with your employer in writing, or call Acas on 0300 123 1100.`}</Verdict>
    </>}
  </div>;
}

export function HolidayPayCalculator() {
  const [hours, setHours] = useState("40");
  const [rate, setRate] = useState("13.50");
  const accrued = num(hours) * 0.1207;
  return <div className="toolcard">
    <div className="toolgrid">
      <Field label="Hours worked in the pay period"><input type="number" min="0" step="0.25" inputMode="decimal" value={hours} onChange={e => setHours(e.target.value)} /></Field>
      <Field label="Hourly rate (£)"><input type="number" min="0" step="0.01" inputMode="decimal" value={rate} onChange={e => setRate(e.target.value)} /></Field>
    </div>
    <Result items={[["Holiday built up", hrs(accrued)], ["Worth (at your rate)", gbp(accrued * num(rate))], ["Rolled-up holiday pay", gbp(num(hours) * num(rate) * 0.1207)]]} />
    <p className="toolnote">Holiday builds up at 12.07% of the hours you work. "Rolled-up" is the extra your employer adds to each payslip instead, if they use that method. Holiday pay should reflect your normal pay, including regular overtime, so the true amount can be higher than your basic rate.</p>
  </div>;
}

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
export function StudentVisaTracker() {
  const [limit, setLimit] = useState("20");
  const [jobs, setJobs] = useState<string[][]>([Array(7).fill(""), Array(7).fill("")]);
  const set = (j: number, d: number, v: string) => setJobs(jobs.map((row, i) => i === j ? row.map((x, k) => k === d ? v : x) : row));
  const dayTotals = DAYS.map((_, d) => jobs.reduce((s, row) => s + num(row[d]), 0));
  const total = dayTotals.reduce((a, b) => a + b, 0);
  const lim = num(limit);
  return <div className="toolcard">
    <div className="toolgrid">
      <Field label="Your term-time limit"><select value={limit} onChange={e => setLimit(e.target.value)}><option value="20">20 hours (degree level)</option><option value="10">10 hours (below degree level)</option></select></Field>
    </div>
    <div className="weekgrid" role="table" aria-label="Hours worked this week">
      <div role="row"><span role="columnheader" />{DAYS.map(d => <b role="columnheader" key={d}>{d}</b>)}</div>
      {jobs.map((row, j) => <div role="row" key={j}><span role="rowheader">Job {j + 1}</span>{row.map((v, d) => <input key={d} type="number" min="0" step="0.25" inputMode="decimal" aria-label={`Job ${j + 1} ${DAYS[d]} hours`} value={v} onChange={e => set(j, d, e.target.value)} placeholder="0" />)}</div>)}
      <div role="row" className="totalrow"><span role="rowheader">Total</span>{dayTotals.map((t, d) => <b key={d}>{t || ""}</b>)}</div>
    </div>
    {jobs.length < 4 && <button className="btn secondary small" onClick={() => setJobs([...jobs, Array(7).fill("")])}>+ Add another job</button>}
    <Result items={[["Hours this week (Mon–Sun)", hrs(total)], ["Your limit", `${lim} hrs`], ["Hours left", hrs(Math.max(0, lim - total))]]} tone={total > lim ? "bad" : ""} />
    <Verdict ok={total <= lim}>{total <= lim ? "You're within your term-time limit for this week." : `That's ${hrs(total - lim)} over your limit. Working over your limit in term time can put your visa at risk — talk to your university's international student advice team.`}</Verdict>
  </div>;
}

export function BreakAndRestCalculator() {
  const [shift, setShift] = useState("12");
  const [young, setYoung] = useState(false);
  const [lastEnd, setLastEnd] = useState("22:00");
  const [nextStart, setNextStart] = useState("06:00");
  const [weeks, setWeeks] = useState("52, 48, 60, 36");
  const sh = num(shift);
  const needBreak = young ? (sh > 4.5 ? 30 : 0) : (sh > 6 ? 20 : 0);
  const rest = minutesBetween(lastEnd, nextStart) / 60;
  const list = weeks.split(/[,\s]+/).map(num).filter(x => x > 0);
  const avg = list.length ? list.reduce((a, b) => a + b, 0) / list.length : 0;
  return <div className="toolstack">
    <div className="toolcard">
      <h3>1. Break during a shift</h3>
      <div className="toolgrid">
        <Field label="Shift length (hours)"><input type="number" min="0" step="0.25" inputMode="decimal" value={shift} onChange={e => setShift(e.target.value)} /></Field>
        <label className="toolcheck"><input type="checkbox" checked={young} onChange={e => setYoung(e.target.checked)} /> I'm under 18</label>
      </div>
      <Verdict ok={true}>{needBreak ? `You're entitled to at least a ${needBreak}-minute uninterrupted break. It doesn't have to be paid, and it doesn't get longer on longer shifts.` : "No statutory break is required for a shift this short."}</Verdict>
    </div>
    <div className="toolcard">
      <h3>2. Rest between two shifts</h3>
      <div className="toolgrid">
        <Field label="Last shift finished"><input type="time" value={lastEnd} onChange={e => setLastEnd(e.target.value)} /></Field>
        <Field label="Next shift starts" hint="Assumes the next shift starts within 24 hours."><input type="time" value={nextStart} onChange={e => setNextStart(e.target.value)} /></Field>
      </div>
      <Result items={[["Rest between shifts", hrs(rest)], ["Legal minimum", young ? "12 hrs" : "11 hrs"]]} tone={rest < (young ? 12 : 11) ? "bad" : ""} />
      <Verdict ok={rest >= (young ? 12 : 11)}>{rest >= (young ? 12 : 11) ? "That meets the daily rest rule." : "That's less than the daily rest rule. Some shift work allows this if you get compensatory rest later — check your contract."}</Verdict>
    </div>
    <div className="toolcard">
      <h3>3. Average working week</h3>
      <Field label="Hours worked each week, across all jobs" hint="Separate weeks with commas. The legal average is usually taken over 17 weeks."><input value={weeks} onChange={e => setWeeks(e.target.value)} /></Field>
      <Result items={[["Weeks entered", String(list.length)], ["Average per week", hrs(avg)], ["Legal limit", "48 hrs"]]} tone={avg > 48 ? "bad" : ""} />
      <Verdict ok={avg <= 48}>{avg <= 48 ? "Your average is within the 48-hour limit." : "Your average is over 48 hours. That's only allowed if you've opted out in writing — and you can cancel an opt-out with notice."}</Verdict>
    </div>
  </div>;
}

// 2026/27, England, Wales and Northern Ireland.
const PA = 12570, BASIC_TOP = 50270, ADD_TOP = 125140;
const NI_PT_M = 12570 / 12, NI_UEL_M = 50270 / 12;
function incomeTax(annual: number, allowance: number) {
  const taxable = Math.max(0, annual - allowance);
  const basic = Math.min(taxable, BASIC_TOP - PA);
  const higher = Math.min(Math.max(0, taxable - basic), ADD_TOP - BASIC_TOP);
  const add = Math.max(0, taxable - basic - higher);
  return basic * 0.2 + higher * 0.4 + add * 0.45;
}
function niMonthly(m: number) {
  return Math.max(0, Math.min(m, NI_UEL_M) - NI_PT_M) * 0.08 + Math.max(0, m - NI_UEL_M) * 0.02;
}
export function TakeHomeTwoJobs() {
  const [m1, setM1] = useState("1800");
  const [m2, setM2] = useState("600");
  const a1 = num(m1) * 12, a2 = num(m2) * 12;
  const tax1 = incomeTax(a1, PA) / 12;
  const tax2 = a2 * 0.2 / 12; // BR code
  const ni1 = niMonthly(num(m1)), ni2 = niMonthly(num(m2));
  const net = num(m1) + num(m2) - tax1 - tax2 - ni1 - ni2;
  const correctTax = incomeTax(a1 + a2, PA) / 12;
  const diff = (tax1 + tax2) - correctTax;
  return <div className="toolcard">
    <div className="toolgrid">
      <Field label="Main job: monthly gross pay (£)"><input type="number" min="0" step="1" inputMode="decimal" value={m1} onChange={e => setM1(e.target.value)} /></Field>
      <Field label="Second job: monthly gross pay (£)"><input type="number" min="0" step="1" inputMode="decimal" value={m2} onChange={e => setM2(e.target.value)} /></Field>
    </div>
    <div className="toolsplit">
      <Result items={[["Main job tax (1257L)", gbp(tax1)], ["Main job NI", gbp(ni1)], ["Main job take-home", gbp(num(m1) - tax1 - ni1)]]} />
      <Result items={[["Second job tax (BR, 20%)", gbp(tax2)], ["Second job NI", gbp(ni2)], ["Second job take-home", gbp(num(m2) - tax2 - ni2)]]} />
    </div>
    <Result items={[["Total take-home per month", gbp(net)], ["Per year", gbp(net * 12)]]} />
    {a1 < PA && a2 > 0 && <Verdict ok={false}>Your main job earns less than the £12,570 personal allowance, so about {gbp(Math.min(PA - a1, a2) * 0.2 / 12)} a month of tax on your second job could be avoided. Ask HMRC to split your allowance between your jobs.</Verdict>}
    {Math.abs(diff) >= 1 && a1 >= PA && <Verdict ok={false}>{diff < 0 ? `Your combined income goes into the higher-rate band, so code BR may under-collect about ${gbp(-diff)} a month. HMRC usually adjusts your tax code to collect this.` : `You may be overpaying about ${gbp(diff)} a month. Check your tax codes with HMRC.`}</Verdict>}
  </div>;
}

export const toolComponents: Record<string, () => ReactNode> = {
  "/tools/shift-pay-calculator": ShiftPayCalculator,
  "/tools/minimum-wage-checker": MinimumWageChecker,
  "/tools/holiday-pay-calculator": HolidayPayCalculator,
  "/tools/student-visa-hours-tracker": StudentVisaTracker,
  "/tools/break-and-rest-calculator": BreakAndRestCalculator,
  "/tools/take-home-pay-two-jobs": TakeHomeTwoJobs,
};
