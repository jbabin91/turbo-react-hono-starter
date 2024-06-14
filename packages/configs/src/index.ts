import _default, { type DeepPartial } from './default';
import development from './development';
import production from './production';

function isObject(item: object) {
  return item && typeof item === 'object' && !Array.isArray(item);
}

function deepMerge<T extends NonNullable<unknown>, U extends DeepPartial<T>>(
  target: T,
  ...sources: U[]
): T {
  if (sources.length === 0) return target;
  const source = sources.shift();

  if (isObject(target) && source && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key as keyof object])) {
        if (!target[key as keyof object]) Object.assign(target, { [key]: {} });
        deepMerge(target[key as keyof object], source[key as keyof object]);
      } else {
        Object.assign(target, { [key]: source[key as keyof object] });
      }
    }
  }

  return deepMerge(target, ...sources);
}

const configModes = {
  development,
  production,
};

export type ConfigMode = keyof typeof configModes;

export const config = deepMerge(
  _default,
  configModes[process.env.NODE_ENV as ConfigMode],
);
