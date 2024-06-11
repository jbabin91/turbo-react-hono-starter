import uiPreset from '@repo/ui/tailwindConfig';
import { type Config } from 'tailwindcss';

export default {
  content: [...uiPreset.content],
  presets: [uiPreset],
} satisfies Config;
