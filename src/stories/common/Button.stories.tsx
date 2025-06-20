import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Button from '../../components/common/button';

const meta: Meta<typeof Button> = {
  title: 'Common/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'danger'],
    },
    variant: {
      control: 'select',
      options: ['solid', 'faded', 'bordered', 'light', 'flat', 'ghost', 'shadow'],
    },
    isLoading: { control: 'boolean' },
    isDisabled: { control: 'boolean' },
    className: { control: 'text' },
    children: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Default',
  },
};

export const CustomClass: Story = {
  args: {
    children: 'Custom Class',
    className:
      'rounded-full bg-gradient-to-r from-pink-400 to-blue-400 font-semibold text-white shadow-lg transition hover:scale-105',
  },
};
