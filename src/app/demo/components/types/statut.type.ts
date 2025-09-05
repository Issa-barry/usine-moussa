// autorisées (inline)
const TAG_SEVERITIES = ['success','info','warning','danger','secondary','contrast'] as const;
type TagSeverity = (typeof TAG_SEVERITIES)[number];

// mapping connu (si le back renvoie ces clés)
const KNOWN_CMD_SEVERITY = {
  brouillon:            'warning',
  a_facturer:           'info',
  facturation_en_cours: 'info',
  livraison_en_cours:   'info',
  livre:                'success',
  cloture:              'secondary',
  annule:               'danger',
} as const;

// fallback label joli
function toLabel(statut: string): string {
  return (statut || '')
    .replace(/_/g, ' ')
    .replace(/\b\p{L}/gu, (c) => c.toUpperCase());
}

// fallback couleur si statut inconnu
function getSeverity(statut: string): TagSeverity {
  const key = (statut || '').toLowerCase();

  if (key in KNOWN_CMD_SEVERITY) {
    return KNOWN_CMD_SEVERITY[key as keyof typeof KNOWN_CMD_SEVERITY];
  }
  if (/annul/i.test(key)) return 'danger';
  if (/brouillon|draft/i.test(key)) return 'warning';
  if (/factur|en[_\s-]?cours|pending|process/i.test(key)) return 'info';
  if (/livr(é|e)?$|pay(é|e)?|regle|réglé|done|complete/i.test(key)) return 'success';
  if (/clot|close|archiv/i.test(key)) return 'secondary';

  return 'secondary';
}
