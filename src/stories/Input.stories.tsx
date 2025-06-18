import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { Input } from '../components/common/input';
import { LABELS } from '../components/common/input/labels';

const meta: Meta<typeof Input> = {
  title: 'Common/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'select',
      options: Object.values(LABELS),
    },
    placeholder: { control: 'text' },
    value: { control: 'text' },
    onChange: { action: 'changed' },
    /** sm, md, lg, full, [000px] */
    width: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Email: Story = {
  args: {
    label: LABELS.EMAIL,
    placeholder: 'example@example.com',
    type: 'email',
    value: '',
  },
  render: (args) => {
    const [value, setValue] = useState('');
    return <Input {...args} value={value} onChange={(e) => setValue(e.target.value)} />;
  },
};

export const Phone: Story = {
  args: {
    label: LABELS.PHONE,
    placeholder: '010-1234-5678',
    type: 'tel',
    value: '',
  },
  render: (args) => {
    const [value, setValue] = useState('');
    return <Input {...args} value={value} onChange={(e) => setValue(e.target.value)} />;
  },
};

export const Name: Story = {
  args: {
    label: LABELS.NAME,
    placeholder: '이름을 입력하세요',
    type: 'text',
    value: '',
  },
  render: (args) => {
    const [value, setValue] = useState('');
    return <Input {...args} value={value} onChange={(e) => setValue(e.target.value)} />;
  },
};

export const sm: Story = {
  args: {
    label: LABELS.EMAIL,
    placeholder: 'example@example.com',
    type: 'email',
    value: '',
    width: 'sm',
  },
};

export const md: Story = {
  args: {
    label: LABELS.EMAIL,
    placeholder: 'example@example.com',
    type: 'email',
    value: '',
    width: 'md',
  },
};

export const lg: Story = {
  args: {
    label: LABELS.EMAIL,
    placeholder: 'example@example.com',
    type: 'email',
    value: '',
    width: 'lg',
  },
};

export const custom: Story = {
  args: {
    label: LABELS.EMAIL,
    placeholder: 'example@example.com',
    type: 'email',
    value: '',
    width: '[100px]',
  },
};
