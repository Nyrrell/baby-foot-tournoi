export const useAuth = () => {
  const api = useApi();
  const token = useCookie('access_token');
  const user = useState<{ username: string; admin: boolean } | null>('user', () => null);
  const isLoggedIn = computed(() => Boolean(token.value));
  const isAdmin = computed(() => user.value?.admin ?? false);

  async function login(username: string, password: string) {
    const data = await api<{ access_token: string }>('/auth/login', {
      method: 'POST',
      body: { username, password },
    });
    token.value = data.access_token;
    const payload = JSON.parse(atob(data.access_token.split('.')[1]!));
    user.value = { username: payload.username, admin: payload.admin };
  }

  function logout() {
    token.value = null;
    user.value = null;
    navigateTo('/');
  }

  return { token, user, isLoggedIn, isAdmin, login, logout };
};
