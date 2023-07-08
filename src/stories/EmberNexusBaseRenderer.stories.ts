import type { Meta, StoryObj } from '@storybook/web-components';
import {BaseRenderer} from "../Component/BaseRenderer.ts";

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta: Meta<typeof BaseRenderer> = {
  title: 'BaseRenderer',
  tags: ['autodocs'],
  render: () => new BaseRenderer(),
  component: 'ember-nexus-base-renderer',
  argTypes: {
    uuid: {
      control: {
        type: 'text'
      }
    }
  },
};

export default meta;


const Template = (args: any) =>
    `<ember-nexus-base-renderer uuid="${args.uuid}"></ember-nexus-base-renderer>`;


type Story = StoryObj<typeof BaseRenderer>;

// More on writing stories with args: https://storybook.js.org/docs/web-components/writing-stories/args

export const Primary: Story = Template.bind({});
Primary.args = {
  uuid: '6b8341ca-851a-4e98-8194-e57b87d30519'
};
