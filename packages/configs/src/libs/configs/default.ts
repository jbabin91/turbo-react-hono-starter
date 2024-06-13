import { z } from 'zod';

const supportedLanguages = ['en'] as const;
const systemRoles = ['USER', 'ADMIN'] as const;
const allRoles = ['USER', 'MEMBER', 'ADMIN'] as const;

export const configSchema = z
  .object({
    mode: z.string(),
    name: z.string(),
    frontendUrl: z.string(),
    backendUrl: z.string(),
    debug: z.boolean().default(false),
    maintenance: z.boolean().default(false),
    defaultLanguage: z.enum(supportedLanguages).default('en'),
    languages: z.array(
      z.object({
        value: z.enum(supportedLanguages),
        label: z.string(),
      }),
    ),
    supportedLanguages: z.array(z.enum(supportedLanguages)),
    rolesByType: z.object({
      systemRoles: z.array(z.enum(systemRoles)),
      allRoles: z.array(z.enum(allRoles)),
    }),
  })
  .partial();

export type Config = z.infer<typeof configSchema>;

const config = {
  mode: 'development',
  name: 'Turbo React Hono Starter',

  frontendUrl: 'http://localhost:5173',
  backendUrl: 'http://localhost:3000',

  debug: false,
  maintenance: false,

  // Languages
  defaultLanguage: 'en' as const,
  languages: [{ value: 'en', label: 'English' }] as const,
  supportedLanguages: ['en'] as const,

  // Roles
  rolesByType: {
    systemRoles: ['USER', 'ADMIN'] as const,
    allRoles: ['USER', 'MEMBER', 'ADMIN'] as const,
  },
} satisfies Config;

export default config;
