import type { Meta, StoryObj } from '@storybook/web-components';
import {BaseRenderer} from "../component/base-renderer/base-renderer.ts";

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta: Meta<typeof BaseRenderer> = {
  title: 'BaseRenderer',
  tags: ['autodocs'],
  render: () => new BaseRenderer(),
  component: 'ember-nexus-base-renderer',
  argTypes: {
    // @ts-ignore
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
  uuid: 'b372cda0-91df-4ea3-9a59-eb713b62a5ef'
};
