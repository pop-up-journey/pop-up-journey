import {
  EnvelopeIcon,
  LinkIcon,
  MapPinIcon,
  PhoneIcon,
  TagIcon,
  TicketIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import type { FC, SVGProps } from 'react';
import { Label, LABELS } from './labels';

export default function LabelIconMapper(label: Label): FC<SVGProps<SVGSVGElement>> | null {
  switch (label) {
    case LABELS.EMAIL:
      return EnvelopeIcon;
    case LABELS.PHONE:
      return PhoneIcon;
    case LABELS.NAME:
      return TagIcon;
    case LABELS.TITLE:
      return TagIcon;
    case LABELS.PEOPLE:
      return UserGroupIcon;
    case LABELS.ADDRESS:
      return MapPinIcon;
    case LABELS.TICKETS:
      return TicketIcon;
    case LABELS.LINK:
      return LinkIcon;
    default:
      return null;
  }
}
