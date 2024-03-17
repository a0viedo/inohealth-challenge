import { PersonMetadata } from '@prisma/client';

export type PersonMetadataJSON = Omit<
  PersonMetadata,
  'dateBirthdate' | 'dateTesting' | 'id' | 'createdAt' | 'updatedAt'
> & {
  dateBirthdate: string;
  dateTesting: string;
};
