import type { Meta, StoryObj } from '@storybook/web-components';
import {EmberNexusTag} from "../ember-nexus-tag.ts";

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta: Meta<typeof EmberNexusTag> = {
  title: 'EmberNexusTag',
  tags: ['autodocs'],
  render: () => new EmberNexusTag(),
  component: 'ember-nexus-tag',
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
    `<ember-nexus-tag uuid="${args.uuid}"></ember-nexus-tag>`;


type Story = StoryObj<typeof EmberNexusTag>;

// More on writing stories with args: https://storybook.js.org/docs/web-components/writing-stories/args

export const Primary: Story = Template.bind({});
Primary.args = {
  uuid: '6b8341ca-851a-4e98-8194-e57b87d30519'
};

/*
export const Primary: Story = {
  args: {
    uuid: '868f20fc-18af-4cb1-9df7-41fe9e3bf99a'
  },
  parameters: {
    uuid: 'some uuid'
  }
};*/
