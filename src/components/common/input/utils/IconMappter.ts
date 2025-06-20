// iconMapper.ts
import { EnvelopeIcon, PhoneIcon, TagIcon } from '@heroicons/react/24/outline';
import type { FC, SVGProps } from 'react';
import { Label, LABELS } from '../labels';

export function getIconByLabel(label: Label): FC<SVGProps<SVGSVGElement>> | null {
  switch (label) {
    case LABELS.EMAIL:
      return EnvelopeIcon;
    case LABELS.PHONE:
      return PhoneIcon;
    case LABELS.NAME:
      return TagIcon;
    default:
      return null;
  }
}
