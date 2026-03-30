import type { FormError } from '@nuxt/ui';

export function validateLoginForm(form: { username: string; password: string }): FormError[] {
  const errors: FormError[] = [];
  if (!form.username) errors.push({ name: 'username', message: 'Requis' });
  if (!form.password) errors.push({ name: 'password', message: 'Requis' });
  return errors;
}
