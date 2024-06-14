export const config = {
  mode: 'development',
  name: 'Turbo React Hono Starter',
  slug: 'turbo-starter',

  domain: 'jacebabin.com',
  frontendUrl: 'http://starter.jacebabin.com',
  backendUrl: 'http://starter-backend.jacebabin.com',
  backendAuthUrl: 'http://starter-backend.jacebabin.com/auth',

  debug: false,
  maintenance: false,

  // OAuth providers
  oauthProviderOptions: ['GITHUB', 'GOOGLE', 'MICROSOFT'] as const,
  enabledOauthProviders: ['GITHUB'] as const,

  // Languages
  defaultLanguage: 'en' as const,
  supportedLanguages: ['en', 'nl'] as const,
  languages: [
    { value: 'en', label: 'English' },
    { value: 'nl', label: 'Nederlands' },
  ],

  // App specific entity types
  entityTypes: ['USER', 'ORGANIZATION', 'WORKSPACE', 'PROJECT'] as const,
  contextEntityTypes: ['ORGANIZATION', 'WORKSPACE', 'PROJECT'] as const,

  rolesByType: {
    systemRoles: ['USER', 'ADMIN'] as const,
    entityRoles: ['MEMBER', 'ADMIN'] as const,
    allRoles: ['USER', 'MEMBER', 'ADMIN'] as const,
  },
};

export default config;

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export type Config = DeepPartial<typeof config>;
