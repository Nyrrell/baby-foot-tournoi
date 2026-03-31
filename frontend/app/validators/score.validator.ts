import type { FormError } from '@nuxt/ui';

import type { ScoreForm } from '~/types/match';

export function validateScoreForm(form: ScoreForm): FormError[] {
  const errors: FormError[] = [];

  if (String(form.equipe1Score) === '')
    errors.push({ name: 'equipe1Score', message: 'Score requis' });

  if (String(form.equipe2Score) === '')
    errors.push({ name: 'equipe2Score', message: 'Score requis' });

  if (Number(form.equipe1Score) < 0)
    errors.push({ name: 'equipe1Score', message: 'Le score ne peut pas être négatif' });

  if (Number(form.equipe2Score) < 0)
    errors.push({ name: 'equipe2Score', message: 'Le score ne peut pas être négatif' });

  return errors;
}
