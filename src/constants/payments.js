export const PAYMENT_STATUS = {
  UNPAID: 'unpaid',
  PARTIAL: 'partial',
  PAID: 'paid',
};

export const PAYMENT_LABELS = {
  [PAYMENT_STATUS.UNPAID]: 'Not paid ',
  [PAYMENT_STATUS.PARTIAL]: 'Half paid ',
  [PAYMENT_STATUS.PAID]: 'Paid fully ',
};

export const DEFAULT_CURRENCY = 'EUR';
