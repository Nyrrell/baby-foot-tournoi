import type { FormError } from '@nuxt/ui';
import type { TournoiForm } from '~/types/tournoi';

export function validateTournoiForm(form: TournoiForm): FormError[] {
  const errors: FormError[] = [];

  if (!form.nom?.trim()) errors.push({ name: 'nom', message: 'Le nom est requis' });

  if (form.nom?.trim().length > 100)
    errors.push({ name: 'nom', message: 'Le nom ne peut pas dépasser 100 caractères' });

  if (!form.date) errors.push({ name: 'date', message: 'La date est requise' });

  if (form.date && new Date(form.date) < new Date())
    errors.push({ name: 'date', message: 'La date doit être dans le futur' });

  return errors;
}
