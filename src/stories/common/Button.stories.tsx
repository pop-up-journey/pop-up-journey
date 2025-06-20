import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from '../../components/common/button';

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
    width: { control: 'text' },
    children: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = { args: { children: 'Default', color: 'default', variant: 'solid', width: '40' } };
export const Primary: Story = { args: { children: 'Primary', color: 'primary', variant: 'solid', width: '40' } };
export const Secondary: Story = { args: { children: 'Secondary', color: 'secondary', variant: 'solid', width: '40' } };
export const Success: Story = { args: { children: 'Success', color: 'success', variant: 'solid', width: '40' } };
export const Warning: Story = { args: { children: 'Warning', color: 'warning', variant: 'solid', width: '40' } };
export const Danger: Story = { args: { children: 'Danger', color: 'danger', variant: 'solid', width: '40' } };

export const Solid: Story = { args: { children: 'Solid', color: 'primary', variant: 'solid', width: '40' } };
export const Faded: Story = { args: { children: 'Faded', color: 'primary', variant: 'faded', width: '40' } };
export const Bordered: Story = { args: { children: 'Bordered', color: 'primary', variant: 'bordered', width: '40' } };
export const Light: Story = { args: { children: 'Light', color: 'primary', variant: 'light', width: '40' } };
export const Flat: Story = { args: { children: 'Flat', color: 'primary', variant: 'flat', width: '40' } };
export const Ghost: Story = { args: { children: 'Ghost', color: 'primary', variant: 'ghost', width: '40' } };
export const Shadow: Story = { args: { children: 'Shadow', color: 'primary', variant: 'shadow', width: '40' } };
