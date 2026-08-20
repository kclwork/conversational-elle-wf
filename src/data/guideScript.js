// ALL legal content below is PLACEHOLDER PENDING LEGAL REVIEW (incl. source material). Do not ship.
//
// Guide-voice Maze script — Scenario 1 (Colorado security deposit), Leann's Strategy
// Session Notes, with a verdict-pushback turn following her Scenario 6 pattern.
// Turns sourced verbatim from Leann are marked [LEANN VERBATIM] — do not paraphrase.
// (Bold **lead-ins** on bullets are presentation only; the words are unchanged.)
//
// Structure: ordered array of turns.
//   role: 'user' | 'elle'
//   expected:   (user turns) the text the Maze mission asks the participant to paste.
//               Reference only — ANY typed input advances the script (forgiving by design).
//   blocks:     (elle turns) content blocks: { type:'p', text } | { type:'bullets', items:[] }
//               | { type:'ctaRow', ctas:[{label, style}] }
//   moments:    flags: 'gate' | 'headsUp' | 'scopeClose' | 'handoff'
//               ('safetyEscalation' is reserved in the engine — content pending Trust & Safety)
//
// Gate policy (Leann, 2026-08-20): the email gate is a WALL — a valid email is
// required to continue. The decline path was removed (there was previously a
// "No thanks, keep it in the chat" chip and a `gateDeclined` branch); the Turn
// 11b provisional re-offer was removed with it because it only ever played on
// the decline path.

// PLACEHOLDER PENDING LEGAL — persistent disclosure line, identical across all three form factors.
export const DISCLOSURE_TEXT = 'Elle provides general legal information, not legal advice.'

// Composer placeholder — identical across all three form factors (entry aids must not differ).
export const INPUT_PLACEHOLDER = 'Ask Elle a legal question…'

export const GATE_EMAIL_PLACEHOLDER = 'Email address'

// Opening greeting — Elle narrates the deal (educational guidance, not legal
// advice, works alongside LegalShield's attorney network) and begins helping
// immediately. Shown on load in BOTH brains, identical across all three form
// factors. PLACEHOLDER copy pending content review.
export const OPENING_MESSAGE = {
  blocks: [
    { type: 'p', text: `Hi, I'm Elle. I can help you understand how the law generally works in your situation, what to do right now to protect yourself, and where an attorney comes in — I work alongside LegalShield's attorney network, and I give educational guidance, not legal advice.` },
    { type: 'p', text: `What's going on?` },
  ],
}

export const guideScript = [
  {
    id: 't1',
    role: 'user',
    // [LEANN VERBATIM]
    expected: `My landlord kept my whole $1,800 security deposit and just said "cleaning and damages." Is that legal?`,
  },
  {
    id: 't2',
    role: 'elle',
    substantive: 1,
    // [LEANN VERBATIM]
    blocks: [
      { type: 'p', text: `That's frustrating, and it's one of the more common disputes tenants run into. I can't tell you whether what your landlord did was lawful — that depends on your state's rules and the specific condition of the unit — but I can walk you through how these rules generally work so you know what you're looking at.` },
      { type: 'p', text: `Most states require a landlord to do three things after you move out: return the deposit within a set window (commonly 14 to 45 days depending on the state), provide an itemized written statement of any deductions, and only deduct for actual damage, not normal wear and tear.` },
      { type: 'p', text: `That last distinction does a lot of work. Generally speaking:` },
      { type: 'bullets', items: [
        `**Normal wear and tear** (usually not deductible): faded paint, small nail holes, worn carpet traffic patterns, minor scuffs`,
        `**Damage** (usually deductible): holes in drywall, pet stains through to the padding, broken fixtures, missing appliances`,
      ] },
      { type: 'p', text: `A vague label like "cleaning and damages" with no itemization is exactly the kind of thing many state statutes address directly — and in a number of states, failing to itemize or missing the deadline carries a penalty, sometimes forfeiture of the right to withhold anything, sometimes multiple damages.` },
      { type: 'p', text: `What state was the rental in, and roughly what date did you hand back the keys?` },
    ],
  },
  {
    id: 't3',
    role: 'user',
    // [LEANN VERBATIM]
    expected: `Colorado. I moved out June 12th.`,
  },
  {
    id: 't4',
    role: 'elle',
    substantive: 2,
    moments: ['gate'], // long-answer rendering stress test + ends with the gate offer
    // [LEANN VERBATIM]
    blocks: [
      { type: 'p', text: `Good — that gives you a concrete timeline to work with, and Colorado is one of the states with a specific statutory framework here, including a written-statement requirement and a penalty provision for wrongful withholding. I'd rather an attorney confirm the exact deadline and how it applies to your situation than have you rely on me for the date math, because the clock can depend on lease terms.` },
      { type: 'p', text: `Here's what's worth doing right now, regardless of how this shakes out:` },
      { type: 'bullets', items: [
        `**Request the itemization in writing.** Email is ideal — you want a timestamped record. Keep it short and neutral: you're requesting a written itemized statement of deductions.`,
        `**Pull together your evidence.** Move-in and move-out photos, your move-in condition checklist, the lease, any texts about the unit's condition, and your forwarding address confirmation.`,
        `**Don't cash a partial check without asking first.** In some contexts, accepting a partial payment can complicate a claim for the rest. Worth a quick check before you deposit anything.`,
        `**Note the amount.** $1,800 is well within small claims limits in most states, which matters for your options.`,
      ] },
      { type: 'p', text: `Where this gets specific to you — and where I have to stop — is whether the deductions were legitimate, whether your landlord's notice satisfied Colorado's requirements, whether you're entitled to a penalty on top of the deposit, and what the demand letter should actually say. A demand letter on law-firm letterhead also tends to land very differently than one from a tenant, which is often the whole ballgame in a deposit dispute.` },
      { type: 'p', text: `Want me to email you a summary of this plus the list of questions to bring to an attorney?` },
    ],
  },
  {
    id: 't5',
    role: 'elle',
    // POST-GATE — a valid email is required to reach this line (the gate is a wall).
    blocks: [
      { type: 'p', text: `Sent! Check your inbox in a few minutes — it'll have everything we've covered plus the attorney question list, and I'll keep it updated as we go. Now, back to your deposit. What else can I walk you through?` },
    ],
  },
  {
    id: 't6',
    role: 'user',
    // the verdict pushback
    expected: `Ok but straight up, can he legally keep it or not?`,
  },
  {
    id: 't7',
    role: 'elle',
    substantive: 3,
    // the refusal — follows Leann's Scenario 6 pattern
    blocks: [
      { type: 'p', text: `I understand why you want a straight answer, and I'm not dodging to be difficult. I'm genuinely not able to give you one, and faking it would be a disservice to you.` },
      { type: 'p', text: `Whether your landlord can keep the deposit turns on things I can't assess: the actual condition of the unit, what your lease says, whether his notice met Colorado's requirements, and how each deduction holds up against the wear-and-tear line. If I told you "no, he can't" and I was wrong, you might overplay your hand or turn down a fair partial refund. If I told you "yes, he can" and I was wrong, you might walk away from money you're owed — possibly plus a penalty.` },
      { type: 'p', text: `What I can tell you is that the pattern you've described — a vague "cleaning and damages" label with no itemization, in a state with a written-statement requirement and a penalty provision — is exactly the kind of pattern attorneys who handle deposit disputes take seriously. That's not the same as "you'll win." It means this is worth a real evaluation rather than something to write off.` },
    ],
  },
  {
    id: 't8',
    role: 'user',
    expected: `Can you just write the demand letter for me?`,
  },
  {
    id: 't9',
    role: 'elle',
    substantive: 4,
    moments: ['headsUp'], // the drafting refusal — ends with the soft heads-up
    blocks: [
      { type: 'p', text: `Writing the letter for your specific situation is where I have to hand off. Drafting for your facts is applied legal work — and it's also where the letter has the most power when it's done right. A demand letter on law-firm letterhead tends to land very differently than one from a tenant, and in deposit disputes that's often the whole ballgame.` },
      { type: 'p', text: `What I can do is show you what a demand letter for a deposit generally contains, so you know exactly what you're asking for:` },
      { type: 'bullets', items: [
        `**The facts:** tenancy dates, move-out date, deposit amount, and what (if anything) was returned`,
        `**The ask:** the specific amount demanded and a deadline to respond`,
        `**The basis:** the itemization you never received and the statutory requirements at issue`,
        `**The consequence:** what happens if they don't respond — often small claims, where $1,800 fits comfortably`,
      ] },
      { type: 'p', text: `We can cover a bit more ground before I connect you with someone. What else would be useful?` },
    ],
  },
  {
    id: 't10',
    role: 'user',
    expected: `What questions should I ask the attorney?`,
  },
  {
    id: 't11',
    role: 'elle',
    substantive: 5,
    moments: ['scopeClose', 'handoff'],
    blocks: [
      { type: 'p', text: `Great question to end on — walking in with the right questions is most of the work.` },
      { type: 'p', text: `Questions worth bringing to the attorney:` },
      { type: 'bullets', items: [
        `Did the landlord's notice meet Colorado's written-statement requirement, and what exact deadline applied to my June 12 move-out?`,
        `Do the claimed deductions hold up against the wear-and-tear line, given my photos and move-in checklist?`,
        `Am I entitled to a penalty on top of the deposit for wrongful withholding?`,
        `Should the demand letter come from the firm, and what should it say?`,
        `If they don't respond, is small claims the right next move?`,
      ] },
      { type: 'p', text: `Here's what you now understand: landlords generally owe you a timely return and an itemized statement; a vague label with no itemization is the pattern state statutes address directly; the wear-and-tear line decides what's deductible; and Colorado has a penalty provision that may apply to wrongful withholding.` },
      { type: 'p', text: `The next genuinely useful step isn't more information — it's a licensed Colorado attorney looking at your lease, the notice, and your photos. That's exactly what a LegalShield membership covers: an attorney reviews your documents, confirms the deadline math, and sends that demand letter on firm letterhead.` },
      // Single handoff CTA per Kaitlyn (replaces "See plans" + "Talk to an attorney").
      { type: 'ctaRow', ctas: [
        { label: 'Subscribe to speak to a lawyer', style: 'primary' },
      ] },
    ],
  },
]
