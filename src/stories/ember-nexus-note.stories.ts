import type { Meta, StoryObj } from '@storybook/web-components';
import {EmberNexusNote} from "../ember-nexus-note.ts";
import {EmberNexusTag} from "../ember-nexus-tag.ts";

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta: Meta<typeof EmberNexusNote> = {
  title: 'EmberNexusNote',
  tags: ['autodocs'],
  render: () => new EmberNexusNote(),
  component: 'ember-nexus-note',
  includeStories: ['Primary'],
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
    `<ember-nexus-note uuid="${args.uuid}"></ember-nexus-note>`;


type Story = StoryObj<typeof EmberNexusNote>;


const Primary: Story = Template.bind({});
Primary.args = {
  uuid: '8693498b-b58d-4210-b8ea-41c5a9adbe5f'
};

export {Primary, EmberNexusNote, EmberNexusTag};
