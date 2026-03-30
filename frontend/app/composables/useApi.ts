import { defu } from 'defu';

export const useApi = () => {
  const config = useRuntimeConfig();

  const token = useCookie('access_token');

  return <T>(url: string, options: Parameters<typeof $fetch>[1] = {}) => {
    const defaults: Parameters<typeof $fetch>[1] = {
      baseURL: config.public.apiUrl,
      headers: token.value ? { Authorization: `Bearer ${token.value}` } : {},
    };

    return $fetch<T>(url, defu(options, defaults));
  };
};
