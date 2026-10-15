// Content for the SEO landing pages: company pay guides, city and role pay
// guides, comparison pages and the hub pages that list them. Plain JS (no
// JSX/browser APIs) so it can be imported both by src/SeoPages.tsx (via Vite)
// and by scripts/prerender.mjs (plain Node), which bakes each page's meta tags,
// JSON-LD and body text into static HTML.
//
// Each page: { title, description, tag, h1, intro, sections: [{ h, p?: [], ul?: [] }], faqs?: [[q, a]], related?: [path] }
// Strings may contain simple inline HTML (<a>, <b>) — they're rendered as HTML.

export const RATES = {
  asOf: "October 2026",
  nlw: "£12.71",
  r1820: "£10.85",
  r1617: "£8.00",
  apprentice: "£8.00",
  rlw: "£13.45",
  llw: "£14.80",
};

const minimumWageList = [
  `Aged 21 and over (National Living Wage): <b>${RATES.nlw}</b> an hour`,
  `Aged 18 to 20: <b>${RATES.r1820}</b> an hour`,
  `Aged 16 to 17: <b>${RATES.r1617}</b> an hour`,
  `Apprentices (under 19, or in the first year of an apprenticeship): <b>${RATES.apprentice}</b> an hour`,
];

const ratesNote = `These are the legal minimum rates from April 2026. Some employers and contracts are accredited by the Living Wage Foundation and pay the voluntary Real Living Wage instead: ${RATES.rlw} an hour across the UK and ${RATES.llw} in London (2025/26 rates — new rates are announced each autumn).`;

const appCta = `Shiftaan keeps every shift, rate and payment in one place, so you can check each payslip in seconds. <a href="https://app.shiftaan.com">Try it free</a>.`;

// ---------------------------------------------------------------------------
// Company pay guides
// ---------------------------------------------------------------------------

const companies = [
  ["g4s", "G4S", "G4S is one of the best-known names in UK security. It has been part of Allied Universal since 2021, and its UK business covers manned guarding, retail, events, ports and secure government sites."],
  ["mitie", "Mitie", "Mitie is a UK facilities management group, and security is one of its largest divisions. Its officers work on offices, retail sites, transport hubs, hospitals and government buildings."],
  ["securitas", "Securitas", "Securitas is a Swedish-headquartered security company with a large UK operation. It provides on-site guarding, mobile patrols, key holding and remote monitoring."],
  ["bidvest-noonan", "Bidvest Noonan", "Bidvest Noonan provides security, cleaning and facilities services across the UK and Ireland, often on corporate, retail, education and public-sector contracts."],
  ["kingdom", "Kingdom", "Kingdom Services Group is a UK company headquartered in the north-west of England. It provides security officers, door supervisors, retail security and enforcement services across the country."],
  ["wilson-james", "Wilson James", "Wilson James provides security, logistics and aviation services, with a strong presence on large construction projects, corporate headquarters and critical infrastructure in the UK."],
  ["ocs", "OCS", "OCS is a facilities services company providing security, cleaning, catering and other support services to offices, hospitals, transport and public-sector clients across the UK."],
  ["corps-security", "Corps Security", "Corps Security traces its roots back to the Corps of Commissionaires, founded in 1859, which makes it one of the longest-running security companies in the UK."],
  ["churchill", "Churchill", "Churchill Group provides security, cleaning and support services, mainly to corporate offices, retail, property and transport clients."],
  ["axis", "Axis", "Axis Security provides security officers and integrated security services to commercial property, retail, corporate and public-sector clients in the UK."],
  ["carlisle", "Carlisle", "Carlisle Support Services provides security officers and front-of-house staff across sectors including retail, transport, healthcare and events."],
  ["cis-security", "CIS Security", "CIS Security is a London-based security company providing manned guarding, concierge and reception security to commercial and residential buildings."],
  ["sodexo", "Sodexo", "Sodexo is a large food and facilities services company. In the UK, some of its contracts include security and front-of-house roles alongside catering and cleaning."],
  ["icts", "ICTS", "ICTS UK & Ireland provides aviation security, guarding and specialist security services, with a long history in airport and transport security."],
];

function companyPage([slug, name, about]) {
  return [`/companies/${slug}`, {
    title: `${name} Security Pay Guide: Rates, Pay Dates & Payslips | Shiftaan`,
    description: `Working for ${name}? What you should be paid at minimum, how to check your ${name} payslip, and what to do if your pay is wrong or late.`,
    tag: "Company pay guide",
    h1: `Working for ${name}: your pay guide`,
    intro: `What you should be paid, how to check your payslip and what to do if something's wrong, written for security officers working for ${name}.`,
    sections: [
      { h: `About working for ${name}`, p: [about, `Your pay usually depends on the client contract and site, not just the company. Two officers employed by ${name} can be on different hourly rates because they work on different contracts, so always check the rate in your own contract or assignment details.`] },
      { h: "The minimum you can be paid", p: ["Whatever the company or contract, your average hourly pay across each pay period can't fall below the legal minimum for your age:"], ul: minimumWageList },
      { h: "", p: [ratesNote, `Not sure your pay is above the line? Use our <a href="/tools/minimum-wage-checker">minimum wage checker</a>.`] },
      { h: "When you get paid", p: [`Large security employers usually pay weekly, fortnightly or monthly, and most pay in arrears — the hours you work in one period are paid in the next. Your contract or onboarding pack should say which applies to you. If it doesn't, ask payroll for two things: your <b>pay date</b> and your <b>cut-off date</b> (the last day of work included in each payment). Knowing the cut-off is the only way to tell whether a "missing" shift is late or just in next month's pay.`] },
      { h: `How to check your ${name} payslip`, ul: [
        "Hours: add up every shift in the pay period (start to finish, minus any unpaid breaks) and compare with the hours on the payslip.",
        "Rate: check each shift was paid at the right rate, especially if you work on more than one site or contract.",
        "Overtime, nights and bank holidays: if your contract promises a higher rate for these, check they appear as separate lines.",
        "Deductions: uniform, licence or training costs can't take your pay below the minimum wage. Look for anything you didn't agree to.",
        "Holiday pay: if you're on irregular hours, check whether holiday is paid as you take it or rolled up into your hourly rate.",
        "Tax code: an emergency code such as 1257L W1/M1, or 0T, can mean you're paying too much tax.",
      ] },
      { h: "If your pay is wrong or late", p: [
        "Start with your own record of every shift you worked. Then raise it in writing (an email is fine) with your supervisor or payroll, listing the dates, hours and amount you think is missing. Most mistakes get fixed at this stage.",
        `If it isn't fixed, you can raise a formal grievance, contact Acas for free advice on 0300 123 1100, or report minimum wage underpayment to HMRC. Our guide on <a href="/blogs/how-to-chase-unpaid-wages-uk">how to chase unpaid wages</a> walks through every step.`,
      ] },
      { h: `Tracking your ${name} shifts`, p: [`Most pay problems come down to nobody having a clear record of the hours. If you also pick up shifts with another company, it's even easier to lose track of which shifts have been paid. ${appCta}`] },
      { h: "", p: [`<small>Shiftaan isn't affiliated with ${name}. This guide is based on general UK employment rules. We don't publish pay rates for individual companies, because rates depend on the contract and site you work on.</small>`] },
    ],
    faqs: [
      [`What is the minimum ${name} can pay me?`, `The same legal minimum as any UK employer: ${RATES.nlw} an hour if you're 21 or over, from April 2026. If your contract is Living Wage accredited, the minimum is ${RATES.rlw} (${RATES.llw} in London).`],
      [`How do I check my ${name} payslip is right?`, "Compare the hours and rate on the payslip against your own record of every shift in that pay period, then check the overtime, holiday pay, deductions and tax code."],
      [`Can I work for ${name} and another security company at the same time?`, "Usually yes, unless your contract says otherwise. Check for an exclusivity or second-job clause, and keep an eye on the 48-hour average working week and the 11-hour rest between shifts across both jobs."],
    ],
    related: ["/tools/shift-pay-calculator", "/tools/minimum-wage-checker", "/pay/london"],
  }];
}

// ---------------------------------------------------------------------------
// City pay guides
// ---------------------------------------------------------------------------

const cities = [
  ["london", "London", "Security work in London is spread across City and Canary Wharf offices, retail on Oxford Street and in Westfield, transport hubs, hospitals, construction sites and a huge night-time economy. Major venues such as Wembley, the O2 and the ExCeL bring a steady stream of event shifts.", `London is the one place where the Real Living Wage is higher: employers accredited by the Living Wage Foundation pay at least <b>${RATES.llw}</b> an hour here. The legal minimum is still ${RATES.nlw}, so check which one your contract follows.`],
  ["manchester", "Manchester", "Manchester has a busy mix of city-centre retail, offices in Spinningfields, student accommodation, the Trafford Centre and one of the UK's biggest night-time economies. Event work at the Co-op Live and AO arenas, Old Trafford and the Etihad Stadium adds weekend and evening shifts."],
  ["birmingham", "Birmingham", "Birmingham's security work covers the Bullring and city-centre retail, offices, hospitals, universities and major construction projects. The NEC, Resorts World Arena, Utilita Arena and Villa Park bring regular event and stewarding shifts."],
  ["leeds", "Leeds", "Leeds has a large retail centre, a growing office and financial sector, two big universities and a busy night-time economy. Event work comes from the First Direct Arena, Headingley and Elland Road."],
  ["glasgow", "Glasgow", "Glasgow's security work includes city-centre retail on Buchanan Street, offices, hospitals, universities and the night-time economy. The OVO Hydro, SEC, Hampden Park, Celtic Park and Ibrox bring a steady supply of event shifts.", "If you live in Scotland, you pay Scottish income tax, which has more bands than the rest of the UK (starter 19%, basic 20% and intermediate 21%, then higher rates). That means your take-home pay can be slightly different from someone earning the same in England, even though the minimum wage is the same."],
  ["liverpool", "Liverpool", "Liverpool's security work covers Liverpool ONE and city-centre retail, the docks and port, hospitals, universities and the night-time economy. Anfield, the new Everton Stadium at Bramley-Moore Dock and the M&S Bank Arena bring regular event shifts."],
  ["bristol", "Bristol", "Bristol has city-centre retail at Cabot Circus, offices, aerospace and engineering sites, hospitals and two universities. Ashton Gate and festival season add event and stewarding work."],
  ["sheffield", "Sheffield", "Sheffield's security work includes Meadowhall, city-centre retail, two large universities, hospitals and industrial sites. The Utilita Arena and football at Bramall Lane and Hillsborough bring event shifts."],
  ["edinburgh", "Edinburgh", "Edinburgh has offices, retail on Princes Street, hospitals, universities and a large hotel and hospitality sector. August is the busiest month of the year, with the Festival Fringe creating thousands of event shifts, and Murrayfield brings rugby and concert work.", "If you live in Scotland, you pay Scottish income tax, which has more bands than the rest of the UK (starter 19%, basic 20% and intermediate 21%, then higher rates). That means your take-home pay can be slightly different from someone earning the same in England, even though the minimum wage is the same."],
  ["leicester", "Leicester", "Leicester's security work covers city-centre retail at Highcross, distribution and warehouse sites along the M1, hospitals and two universities. The King Power Stadium and Welford Road bring event shifts."],
];

function cityPage([slug, city, work, extra]) {
  return [`/pay/${slug}`, {
    title: `Security Guard Pay in ${city} (${new Date().getFullYear()}): Rates & Rights | Shiftaan`,
    description: `What security guards in ${city} should be paid, where the work is, and what changes your take-home pay. Minimum rates, nights, overtime and how to check your pay.`,
    tag: "Pay by city",
    h1: `Security guard pay in ${city}`,
    intro: `What you should be paid as a security officer in ${city}, where the work is, and what to check on every payslip.`,
    sections: [
      { h: `The minimum pay in ${city}`, p: ["The legal minimum is the same everywhere in the UK. Your average hourly pay in each pay period must be at least:"], ul: minimumWageList },
      { h: "", p: [extra && slug === "london" ? extra : ratesNote] },
      { h: `Where the security work is in ${city}`, p: [work, "Rates vary a lot by sector. Event and night shifts, construction sites and specialist roles often pay more than daytime static guarding, and contracts for corporate clients are more likely to follow the Real Living Wage."] },
      ...(extra && slug !== "london" ? [{ h: "Tax in Scotland", p: [extra] }] : []),
      { h: "What changes your take-home pay", ul: [
        "Unpaid breaks: on a 12-hour shift, a 30 or 60-minute unpaid break makes a real difference. Check whether your breaks are paid.",
        "Travel between sites: time spent travelling between sites during your working day counts as working time for minimum wage purposes. Your commute to the first site doesn't.",
        "Nights, weekends and bank holidays: there's no legal right to a higher rate, so it depends entirely on your contract.",
        "Two jobs: your second job is often taxed at a flat 20% with no personal allowance (tax code BR).",
        "Holiday pay: on irregular hours, holiday builds up at 12.07% of the hours you work.",
      ] },
      { h: "Check your pay in a minute", p: [`Use the <a href="/tools/shift-pay-calculator">shift pay calculator</a> to work out what a shift should pay, or the <a href="/tools/take-home-pay-two-jobs">take-home pay calculator</a> if you have two jobs. ${appCta}`] },
    ],
    faqs: [
      [`What is the minimum wage for a security guard in ${city}?`, `${RATES.nlw} an hour if you're 21 or over, from April 2026. ${slug === "london" ? `Living Wage accredited employers in London pay at least ${RATES.llw}.` : `Living Wage accredited employers pay at least ${RATES.rlw}.`}`],
      ["Do security guards get paid more for night shifts?", "Only if your contract says so. There's no legal night-shift premium in the UK, but many contracts pay one, so check yours."],
      [`Do I need an SIA licence to work in security in ${city}?`, "Yes, for most front-line security roles anywhere in the UK, including guarding, door supervision and public-space CCTV. Event stewards who don't carry out security activities may not need one."],
    ],
    related: ["/pay/door-supervisor", "/tools/shift-pay-calculator", "/companies"],
  }];
}

// ---------------------------------------------------------------------------
// Role pay guides
// ---------------------------------------------------------------------------

const roles = [
  ["door-supervisor", "Door supervisor", "door supervisors", "Door supervisors work at pubs, clubs, bars, events and anywhere licensed to sell alcohol, controlling entry, searching and handling conflict. You need an SIA door supervisor licence. That licence also lets you work as a security guard, which is why many people choose it.", ["Most door work is evenings, nights and weekends, so check what your contract says about late-night rates.", "Shifts are often short (4 to 6 hours), so travel time and unpaid breaks have a bigger effect on what you earn per hour.", "Event door work often comes through agencies, so you may be paid by several different companies in one month."]],
  ["cctv-operator", "CCTV operator", "CCTV operators", "CCTV operators monitor cameras in control rooms for councils, shopping centres, transport operators and private sites. If you watch public spaces or identify people on behalf of a client, you need an SIA Public Space Surveillance (CCTV) licence.", ["Control rooms usually run 24/7, so expect rotating day and night shifts.", "Long shifts in front of screens mean breaks matter — you're entitled to at least 20 minutes if you work over 6 hours.", "Some roles pay more for extra responsibilities such as alarm response or supervising other operators."]],
  ["event-steward", "Event steward", "event stewards", "Event stewards manage crowds, check tickets and help people at concerts, sports and festivals. Stewards who only do customer-service tasks may not need an SIA licence, but if you search people, guard against unauthorised access or handle security at licensed events, you need one (usually a door supervisor licence).", ["Event work is irregular, so holiday pay usually builds up at 12.07% of the hours you work.", "Shifts often start early or run late, and travel to big venues can be long, so log the real start and finish times.", "You may work for several event companies in one season, which makes it easy to lose track of who has paid you."]],
  ["retail-security-officer", "Retail security officer", "retail security officers", "Retail security officers work in shops and shopping centres, deterring theft, responding to incidents and supporting staff. You need an SIA security guard licence (or a door supervisor licence, which covers this too).", ["Retail shifts often follow opening hours, with longer days in the run-up to Christmas.", "Many officers cover several stores, so check travel between stores is counted as working time.", "Some contracts pay more for store detective or plain-clothes work."]],
  ["concierge", "Concierge security", "concierge and front-of-house security officers", "Concierge and front-of-house security officers manage reception, visitor access and building security in offices and residential blocks. If the role includes guarding against unauthorised access, you need an SIA security guard licence.", ["Corporate and residential contracts are more likely to follow the Real Living Wage, especially in London.", "Roles are often long day or night shifts, sometimes on a 4-on-4-off pattern.", "Customer service is a big part of the job, so some contracts pay a little more than standard static guarding."]],
  ["mobile-patrol-officer", "Mobile patrol officer", "mobile patrol officers", "Mobile patrol officers drive between sites to check buildings, respond to alarms, lock and unlock premises and hold keys. You need an SIA security guard licence (key holding is covered by guarding and door supervisor licences), plus a full driving licence.", ["Time driving between sites during your shift is working time and must be paid at least the minimum wage.", "Night patrols and alarm response are common, so rest between shifts matters.", "If you use your own vehicle, check what mileage you're paid and keep a record."]],
];

function rolePage([slug, role, plural, about, tips]) {
  return [`/pay/${slug}`, {
    title: `${role.replace(/\b\w/g, (c) => c.toUpperCase())} Pay UK (${new Date().getFullYear()}): Hourly Rates, Licence & Rights | Shiftaan`,
    description: `What ${plural} in the UK should be paid, which SIA licence you need, and how to check your pay. Minimum rates, nights, breaks and holiday pay explained.`,
    tag: "Pay by role",
    h1: `${role} pay in the UK`,
    intro: `What ${plural} should be paid, the licence you need and the things to check on every payslip.`,
    sections: [
      { h: "About the role", p: [about] },
      { h: "The minimum you can be paid", p: ["Your average hourly pay in each pay period must be at least the legal minimum for your age:"], ul: minimumWageList },
      { h: "", p: [ratesNote] },
      { h: `Things that affect ${plural}' pay`, ul: tips },
      { h: "Check every shift", p: [`Work out what a shift should pay with the <a href="/tools/shift-pay-calculator">shift pay calculator</a>, and check your breaks and rest with the <a href="/tools/break-and-rest-calculator">break and rest calculator</a>. ${appCta}`] },
    ],
    faqs: [
      [`What is the minimum wage for ${plural}?`, `${RATES.nlw} an hour if you're 21 or over, from April 2026. Living Wage accredited employers pay at least ${RATES.rlw} (${RATES.llw} in London).`],
      ["Do I get paid for my breaks?", "Only if your contract says so. You have a legal right to a 20-minute break on shifts over 6 hours, but not to be paid for it."],
    ],
    related: ["/pay", "/tools/holiday-pay-calculator", "/companies"],
  }];
}

// ---------------------------------------------------------------------------
// Comparison pages
// ---------------------------------------------------------------------------

const comparisons = [
  ["/compare/shiftaan-vs-excel", "Excel", "Shiftaan vs Excel for Tracking Shifts and Pay | Shiftaan",
    "Plenty of shift workers start with an Excel spreadsheet. It's flexible and free if you already have Office, and you can build any formula you like.",
    ["You have to build and maintain the formulas yourself, including overnight shifts that cross midnight and unpaid breaks.", "It's awkward on a phone, so most people end up updating it days later from memory.", "Tracking which shifts have been paid, part-paid or are overdue needs extra columns and careful updating.", "Multiple companies with different rates and pay dates quickly turn into multiple sheets."],
    ["You love building spreadsheets and only work for one company.", "You need custom reports that no app offers."]],
  ["/compare/shiftaan-vs-google-sheets", "Google Sheets", "Shiftaan vs Google Sheets for Tracking Shifts | Shiftaan",
    "Google Sheets is how Shiftaan started — our founder tracked his own shifts in a sheet, adding a column every time something got complicated. It's free and works on any device.",
    ["Every new problem means a new column: breaks, rates per site, paid status, expenses.", "Editing cells on a phone at the end of a 12-hour shift is fiddly, so entries get missed.", "Formulas break easily when rows are added or copied.", "Seeing what each company still owes you means building your own summary tables."],
    ["You only work occasional shifts and like building your own system.", "You need to share the sheet with someone else."]],
  ["/compare/shiftaan-vs-notes-app", "the Notes app", "Shiftaan vs the Notes App for Tracking Shifts | Shiftaan",
    "Most shift workers start by typing shifts into their phone's Notes app. It's quick and always with you, which is exactly why it's so popular.",
    ["Notes can't add up hours or pay, so you do the maths yourself every time.", "Breaks, rates and sites end up written differently every time, which makes checking a payslip slow.", "There's no way to mark a shift as paid, part-paid or overdue.", "When a pay dispute comes up, a messy note is a weak record."],
    ["You work one fixed job with the same hours every week.", "You only need a reminder of when your next shift is."]],
  ["/compare/shift-tracker-apps", "other shift tracker apps", "Best Shift Tracker Apps for Workers (UK) | Shiftaan",
    "There are two very different kinds of shift app. Employer apps such as rota and scheduling tools (for example Deputy, RotaCloud or Connecteam) are bought by companies to plan staff. Personal hour trackers are for workers to keep their own record.",
    ["Employer rota apps only show the shifts for that one employer, and you lose access when you leave.", "They don't track what you've actually been paid, or what each company still owes you.", "Generic personal hour trackers are usually built for freelancers billing clients, not for workers on hourly rates with several employers.", "Few apps handle different rates per site, overnight shifts and paid status together."],
    ["Your employer requires you to use their app for clocking in — keep using it for that, and use your own tracker as your personal record.", "You only need a timer, not pay tracking."]],
];

function comparePage([path, other, title, intro, cons, fine]) {
  const isApps = path.endsWith("shift-tracker-apps");
  return [path, {
    title,
    description: `How Shiftaan compares with ${other} for tracking shifts, hours and pay across multiple companies — what each is good at and when to switch.`,
    tag: "Compare",
    h1: isApps ? "Shift tracker apps: which one is right for you?" : `Shiftaan vs ${other}`,
    intro: isApps ? "Employer rota apps, personal hour trackers and Shiftaan do different jobs. Here's how to choose." : `An honest comparison for shift workers who want to know what they've worked and what they're owed.`,
    sections: [
      { h: isApps ? "Two kinds of shift app" : `Why people use ${other}`, p: [intro] },
      { h: `Where ${other} ${isApps ? "fall" : "falls"} short for shift work`, ul: cons },
      { h: "What Shiftaan does differently", ul: [
        "Log a shift in under 30 seconds on your phone: company, site, start, finish, break and rate.",
        "Hours and expected pay are calculated for you, including overnight shifts.",
        "Every company and site keeps its own rates.",
        "Mark each shift as paid, awaiting, part-paid, overdue or disputed, and see what each company still owes you.",
        "Free for up to 3 companies, with unlimited shifts.",
      ] },
      { h: `When ${other} ${isApps ? "are" : "is"} fine`, ul: fine },
      { h: "Try it with your next shift", p: [appCta] },
    ],
    related: ["/compare", "/tools/shift-pay-calculator", "/tools/take-home-pay-two-jobs"],
  }];
}

// ---------------------------------------------------------------------------
// Tools (interactive components live in src/Tools.tsx; this is their copy)
// ---------------------------------------------------------------------------

export const tools = {
  "/tools/shift-pay-calculator": {
    title: "Shift Pay Calculator UK: Hours & Pay for Any Shift | Shiftaan",
    description: "Free shift pay calculator. Enter start, finish, break and hourly rate to see hours worked and pay, including overnight shifts and unpaid breaks.",
    h1: "Shift pay calculator",
    intro: "Work out the hours and pay for any shift, including night shifts that finish the next day.",
    explain: [
      { h: "How it works", p: ["Enter your start and finish times, your break and your hourly rate. If your finish time is earlier than your start time, the calculator assumes the shift finished the next morning. Unpaid breaks are taken off your paid hours; paid breaks aren't."] },
      { h: "Checking your payslip", p: ["Add up the pay for every shift in the pay period and compare it with the gross pay on your payslip. If the numbers don't match, check the hours, the rate and whether your breaks were paid."] },
    ],
  },
  "/tools/minimum-wage-checker": {
    title: "Am I Paid Minimum Wage? UK Checker (2026) | Shiftaan",
    description: "Check whether your pay meets the UK minimum wage. Enter your age, hours and pay for the pay period, plus any deductions, to see your real hourly rate.",
    h1: "Am I paid minimum wage?",
    intro: "Check your real hourly rate for a pay period against the legal minimum for your age.",
    explain: [
      { h: "How the minimum wage is worked out", p: ["The minimum wage is checked across each pay reference period — usually a week or a month — not shift by shift. Your total pay for the period, minus certain deductions, is divided by the hours you worked.", "Deductions for things you need for the job, such as uniform, your SIA licence or required training, count against your pay for this check. If they take your average below the minimum, you've been underpaid."] },
      { h: "If you've been underpaid", p: ["Raise it with your employer in writing first. If it isn't fixed, you can complain to HMRC, which enforces the minimum wage, or call Acas on 0300 123 1100 for free advice. Your employer has to pay back the arrears."] },
    ],
  },
  "/tools/holiday-pay-calculator": {
    title: "Holiday Pay Calculator for Irregular Hours (12.07%) | Shiftaan",
    description: "Work out holiday entitlement and holiday pay for irregular-hours and part-year workers using the 12.07% accrual rule.",
    h1: "Holiday pay calculator for irregular hours",
    intro: "If your hours change from week to week, your holiday builds up at 12.07% of the hours you work. Here's what that means in hours and pounds.",
    explain: [
      { h: "Where 12.07% comes from", p: ["Most workers are entitled to 5.6 weeks of paid holiday a year. If you work 46.4 weeks and take 5.6 weeks off, 5.6 ÷ 46.4 = 12.07%. For leave years starting on or after 1 April 2024, irregular-hours and part-year workers build up holiday at 12.07% of the hours they work in each pay period."] },
      { h: "Rolled-up holiday pay", p: ["For irregular-hours and part-year workers, employers can choose to pay holiday as an extra 12.07% on top of each payslip instead of paying it when you take time off. If they do, it should be shown as a separate line on your payslip."] },
    ],
  },
  "/tools/student-visa-hours-tracker": {
    title: "Student Visa 20-Hour Work Limit Tracker (UK) | Shiftaan",
    description: "Track your weekly hours across every job against the UK Student visa limit of 20 hours (or 10) a week during term time, Monday to Sunday.",
    h1: "Student visa 20-hour tracker",
    intro: "Add up your hours across every job for one week and check them against your term-time limit.",
    explain: [
      { h: "How the limit works", p: ["If you're studying at degree level on a Student visa, you can usually work up to 20 hours a week during term time. Below degree level the limit is usually 10 hours. Your limit is printed on your visa or BRP/eVisa — always check yours.", "A week means Monday to Sunday, and the limit applies to all your jobs added together. It's a weekly limit, not an average, so working 25 hours one week and 15 the next is still a breach."] },
      { h: "Outside term time", p: ["You can usually work full time during your university's official vacations. Check the dates with your university, because they're the ones that count."] },
    ],
  },
  "/tools/break-and-rest-calculator": {
    title: "Break & Rest Calculator: UK Working Time Rules | Shiftaan",
    description: "Check your breaks, rest between shifts and average weekly hours against UK working time rules: 20-minute breaks, 11 hours' rest and the 48-hour week.",
    h1: "Break and rest calculator",
    intro: "Check one shift's break, the rest between two shifts, and your average weekly hours against UK working time rules.",
    explain: [
      { h: "The rules", ul: ["Break: at least 20 minutes, uninterrupted, if you work more than 6 hours (30 minutes after 4.5 hours if you're under 18).", "Daily rest: at least 11 hours in a row between working days.", "Weekly rest: 24 hours without work each week, or 48 hours each fortnight.", "Working week: no more than 48 hours on average, usually over 17 weeks, unless you've opted out in writing. All your jobs count together."] },
      { h: "Exceptions", p: ["Security and surveillance work is one of the areas where the break and rest rules can be varied, as long as you get equivalent compensatory rest. Your contract should explain how this works."] },
    ],
  },
  "/tools/take-home-pay-two-jobs": {
    title: "Take-Home Pay Calculator for Two Jobs (UK 2026/27) | Shiftaan",
    description: "Estimate your take-home pay with two jobs. See tax and National Insurance on each job, and why your second job is often taxed at 20% with code BR.",
    h1: "Take-home pay calculator for two jobs",
    intro: "Estimate the tax and National Insurance on each of your jobs, and what you take home each month.",
    explain: [
      { h: "Why your second job is taxed differently", p: ["Your tax-free personal allowance (£12,570 a year) is normally given to one job, usually your main one. Your second job then gets tax code BR, which means 20% tax on everything you earn there. That's not extra tax — it's how your allowance is split.", "If your main job pays less than £12,570 a year, part of your allowance is wasted. You can ask HMRC to move some of it to your second job."] },
      { h: "National Insurance works per job", p: ["National Insurance is worked out separately for each job, on each pay period. If you earn under the threshold (about £242 a week) in a job, you pay no NI on that job, even if your total across both jobs is higher."] },
      { h: "This is an estimate", p: ["The calculator uses 2026/27 rates for England, Wales and Northern Ireland, an even monthly income and no pension or student loan deductions. Scotland has different income tax bands. Check your actual tax code on your payslip or in your HMRC app."] },
    ],
  },
};

// ---------------------------------------------------------------------------
// Assemble
// ---------------------------------------------------------------------------

export const companyLinks = companies.map(([slug, name]) => [`/companies/${slug}`, name]);
export const cityLinks = cities.map(([slug, city]) => [`/pay/${slug}`, city]);
export const roleLinks = roles.map(([slug, role]) => [`/pay/${slug}`, role]);
export const compareLinks = comparisons.map(([path, other]) => [path, other === "other shift tracker apps" ? "Shift tracker apps compared" : `Shiftaan vs ${other}`]);
export const toolLinks = Object.entries(tools).map(([path, t]) => [path, t.h1, t.intro]);

export const seoPages = Object.fromEntries([
  ...companies.map(companyPage),
  ...cities.map(cityPage),
  ...roles.map(rolePage),
  ...comparisons.map(comparePage),
]);

// Hub pages: meta only; their bodies are link lists rendered from the arrays above.
export const hubs = {
  "/tools": {
    title: "Free Tools for Shift Workers: Pay, Holiday & Hours Calculators | Shiftaan",
    description: "Free calculators for UK shift workers and security guards: shift pay, minimum wage checker, holiday pay, student visa hours, breaks and take-home pay.",
    tag: "Free tools", h1: "Free tools for shift workers",
    intro: "Quick calculators to check your pay, hours, holiday and breaks. No sign-up needed.",
  },
  "/companies": {
    title: "Security Company Pay Guides: G4S, Mitie, Securitas & More | Shiftaan",
    description: "Pay guides for officers working for the UK's biggest security companies: minimum rates, pay dates, payslip checks and what to do if pay is wrong.",
    tag: "Company pay guides", h1: "Security company pay guides",
    intro: "What you should be paid and how to check your payslip, for officers at the UK's biggest security employers.",
  },
  "/pay": {
    title: "Security Guard Pay Guides by City & Role (UK) | Shiftaan",
    description: "Security pay guides for London, Manchester, Birmingham and more, plus door supervisor, CCTV operator, event steward and other roles.",
    tag: "Pay guides", h1: "Security pay guides",
    intro: "What you should be paid as a security officer, by city and by role.",
  },
  "/compare": {
    title: "Compare Shift Tracking Options | Shiftaan",
    description: "How Shiftaan compares with Excel, Google Sheets, the Notes app and other shift tracker apps for tracking shifts and pay.",
    tag: "Compare", h1: "Compare ways to track your shifts",
    intro: "Spreadsheets, notes and apps all work differently. Here's what each is good at.",
  },
};

// Every route this file adds, with its meta, for the router and prerender.
export const seoMeta = Object.fromEntries([
  ...Object.entries(hubs).map(([p, h]) => [p, { title: h.title, description: h.description }]),
  ...Object.entries(tools).map(([p, t]) => [p, { title: t.title, description: t.description }]),
  ...Object.entries(seoPages).map(([p, s]) => [p, { title: s.title, description: s.description }]),
]);
