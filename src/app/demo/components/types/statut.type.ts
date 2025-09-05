// --- Status utils: Commandes + Factures ---

export const TAG_SEVERITIES = ['success','info','warning','danger','secondary','contrast'] as const;
export type TagSeverity = (typeof TAG_SEVERITIES)[number];

/** Normalise une clé venant du back:
 *  - retire accents
 *  - toLowerCase
 *  - espaces/tirets -> '_'
 *  - '_' multiples condensés
 */
export function normalizeKey(key: string): string {
  return (key ?? '')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[\s-]+/g, '_')
    .replace(/_+/g, '_')
    .trim();
}

/** "foo_bar" -> "Foo Bar" */
function titleCaseFromUnderscore(input: string): string {
  const pretty = (input || '').replace(/_/g, ' ').trim();
  return pretty
    .split(' ')
    .map(w => (w ? w.charAt(0).toUpperCase() + w.slice(1) : w))
    .join(' ');
}

/* =========================
 *        COMMANDES
 * ========================= */

const KNOWN_CMD_LABEL: Record<string, string> = {
  brouillon:             'Brouillon',
  a_facturer:            'À facturer',
  facturation_en_cours:  'Facturation en cours',
  livraison_en_cours:    'En cours de livraison',
  livre:                 'Livrée',
  cloture:               'Clôturée',
  annule:                'Annulée',
};

const KNOWN_CMD_SEVERITY: Record<string, TagSeverity> = {
  brouillon:             'warning',
  a_facturer:            'info',
  facturation_en_cours:  'info',
  livraison_en_cours:    'info',
  livre:                 'success',
  cloture:               'secondary',
  annule:                'danger',
} as const;

export function toCommandeLabel(statut: string): string {
  const key = normalizeKey(statut);
  return KNOWN_CMD_LABEL[key] ?? titleCaseFromUnderscore(statut);
}

export function getCommandeSeverity(statut: string): TagSeverity {
  const key = normalizeKey(statut);
  if (key in KNOWN_CMD_SEVERITY) {
    return KNOWN_CMD_SEVERITY[key as keyof typeof KNOWN_CMD_SEVERITY];
  }
  // Fallbacks
  if (/annul/.test(key)) return 'danger';
  if (/brouillon|draft/.test(key)) return 'warning';
  if (/factur|en_cours|pending|process/.test(key)) return 'info';
  if (/livre$|paye|regle|complete|done/.test(key)) return 'success';
  if (/clot|close|archive/.test(key)) return 'secondary';
  return 'secondary';
}

/* =========================
 *         FACTURES
 * ========================= */

/** Aliases pour gérer pluriels & variantes du back (ex: "payees" -> "payee") */
const FACT_ALIASES: Record<string,string> = {
  payees:                 'payee',
  impayees:               'impayee',
  cloturees:              'cloturee',
  annulees:               'annulee',
  envoyees:               'envoyee',
  partiellement_payees:   'partiellement_payee',
};

function normalizeFactKey(raw: string): string {
  const k = normalizeKey(raw);
  return FACT_ALIASES[k] ?? k;
}

/** Labels officiels (singuliers) avec accents */
const KNOWN_FACT_LABEL: Record<string,string> = {
  brouillon:             'Brouillon',
  envoyee:               'Envoyée',
  partiellement_payee:   'Partiellement payée',
  payee:                 'Payée',
  impayee:               'Impayée',
  en_retard:             'En retard',
  cloturee:              'Clôturée',
  annulee:               'Annulée',
  // on accepte aussi les pluriels en label si tu veux les afficher tels quels
  payees:                'Payées',
  impayees:              'Impayées',
  cloturees:             'Clôturées',
  annulees:              'Annulées',
  envoyees:              'Envoyées',
  partiellement_payees:  'Partiellement payées',
};

const KNOWN_FACT_SEVERITY: Record<string, TagSeverity> = {
  brouillon:             'warning',
  envoyee:               'info',
  partiellement_payee:   'info',
  payee:                 'success',
  impayee:               'danger',
  en_retard:             'danger',
  cloturee:              'secondary',
  annulee:               'danger',
  // si jamais tu affiches les pluriels tels quels
  payees:                'success',
  impayees:              'danger',
  cloturees:             'secondary',
  annulees:              'danger',
  envoyees:              'info',
  partiellement_payees:  'info',
} as const;

export function toFactureLabel(statut: string): string {
  // on tente d’abord la clé brute (pour pluriels), sinon sa version unifiée
  const raw = normalizeKey(statut);
  if (KNOWN_FACT_LABEL[raw]) return KNOWN_FACT_LABEL[raw];

  const k = normalizeFactKey(statut);
  return KNOWN_FACT_LABEL[k] ?? titleCaseFromUnderscore(statut);
}

export function getFactureSeverity(statut: string): TagSeverity {
  const raw = normalizeKey(statut);
  if (raw in KNOWN_FACT_SEVERITY) {
    return KNOWN_FACT_SEVERITY[raw as keyof typeof KNOWN_FACT_SEVERITY];
  }

  const k = normalizeFactKey(statut);
  if (k in KNOWN_FACT_SEVERITY) {
    return KNOWN_FACT_SEVERITY[k as keyof typeof KNOWN_FACT_SEVERITY];
  }

  // Fallbacks génériques
  if (/retard/.test(k)) return 'danger';
  if (/impaye|du/.test(k)) return 'danger';
  if (/annul/.test(k)) return 'danger';
  if (/brouillon|draft/.test(k)) return 'warning';
  if (/partiel|envoye/.test(k)) return 'info';
  if (/payee|regle|encaisse/.test(k)) return 'success';
  if (/clot/.test(k)) return 'secondary';
  return 'secondary';
}
