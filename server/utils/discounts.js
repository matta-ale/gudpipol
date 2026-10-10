/**
 * Parse DISCOUNT_CODES env: "VERANO:10,AMIGOS:15,VIP:20"
 * Returns Map of uppercase code -> percent number.
 */
const parseDiscountCodes = () => {
  const raw = process.env.DISCOUNT_CODES || '';
  const map = new Map();

  raw
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean)
    .forEach((part) => {
      const [codeRaw, percentRaw] = part.split(':');
      if (!codeRaw || percentRaw === undefined) return;
      const code = codeRaw.trim().toUpperCase();
      const percent = parseFloat(String(percentRaw).trim());
      if (!code || Number.isNaN(percent) || percent <= 0 || percent > 100) return;
      map.set(code, percent);
    });

  return map;
};

/**
 * @param {string} code
 * @returns {number|null} discount percent or null if invalid
 */
const getDiscountPercent = (code) => {
  if (!code || typeof code !== 'string') return null;
  const normalized = code.trim().toUpperCase();
  if (!normalized) return null;
  const map = parseDiscountCodes();
  return map.has(normalized) ? map.get(normalized) : null;
};

/**
 * @param {string} code
 * @returns {{ valid: boolean, code: string|null, percent: number|null }}
 */
const resolveDiscount = (code) => {
  const percent = getDiscountPercent(code);
  if (percent === null) {
    return { valid: false, code: null, percent: null };
  }
  return {
    valid: true,
    code: String(code).trim().toUpperCase(),
    percent,
  };
};

module.exports = {
  parseDiscountCodes,
  getDiscountPercent,
  resolveDiscount,
};
