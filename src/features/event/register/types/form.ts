import { DateValue } from '@heroui/react';

export interface FormDto {
  title: string;
  description: string;
  email: string;
  recruitmentMethod: string[];
  capacity: number;
  selectedInfo: string[];
  thumbnail: string[];
  eventStart: DateValue;
  eventEnd: DateValue;
  zonecode: string;
  address: string;
  extraAddress: string;
}
