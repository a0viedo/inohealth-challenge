import { PersonMetadata } from '@prisma/client';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { PersonMetadataJSON } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function fetchData() {}

export const snakeToCamel = (str: string) =>
  str
    .toLowerCase()
    .replace(/([-_][a-z])/g, group =>
      group.toUpperCase().replace('-', '').replace('_', '')
    );

export const convertObjectKeysToCamelCase = <T>(
  obj: Record<string, any>
): T => {
  const result: any = {};

  Object.keys(obj).forEach(key => {
    const camelCaseKey = snakeToCamel(key);
    result[camelCaseKey] = obj[key];
  });

  return result;
};

export const convertPersonMetadataItem = (
  obj: PersonMetadataJSON
): Omit<PersonMetadata, 'id' | 'createdAt' | 'updatedAt'> => {
  return {
    ...obj,
    dateBirthdate: new Date(obj.dateBirthdate),
    dateTesting: new Date(obj.dateTesting),
  };
};

export const formatDate = (dateInput: string) => {
  const date = new Date(dateInput);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};
