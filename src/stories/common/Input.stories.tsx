import Input from '@/components/common/input';
import { LABELS } from '@/components/common/input/labels';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';

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
    type: { control: 'text' },
    isReadOnly: { control: 'boolean' },
    isRequired: { control: 'boolean' },
    errorMessage: { control: 'text' },
    description: { control: 'text' },
    isInvalid: { control: 'boolean' },
    variant: { control: 'select', options: ['flat', 'bordered', 'faded', 'underlined'] },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

const styles = {
  root: 'flex h-[50vh] items-center justify-center',
  inputWrapper: 'rounded-3xl border border-white/20 bg-white/10 p-10 shadow-2xl backdrop-blur-2xl w-md',
};

export const Email: Story = {
  args: {
    label: LABELS.EMAIL,
    placeholder: 'example@example.com',
    type: 'email',
    value: '',
  },
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <div className={styles.root}>
        <div className={styles.inputWrapper}>
          <Input {...args} value={value} onChange={(e) => setValue(e.target.value)} />
        </div>
      </div>
    );
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
    return (
      <div className={styles.root}>
        <div className={styles.inputWrapper}>
          <Input {...args} value={value} onChange={(e) => setValue(e.target.value)} />
        </div>
      </div>
    );
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
    return (
      <div className={styles.root}>
        <div className={styles.inputWrapper}>
          <Input {...args} value={value} onChange={(e) => setValue(e.target.value)} />
        </div>
      </div>
    );
  },
};
