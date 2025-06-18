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
