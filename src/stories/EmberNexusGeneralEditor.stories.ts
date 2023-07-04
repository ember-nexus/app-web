import type { Meta, StoryObj } from '@storybook/web-components';
import {EmberNexusGeneralEditor} from "../ember-nexus-general-editor.ts";

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta: Meta<typeof EmberNexusGeneralEditor> = {
  title: 'EmberNexusGeneralEditor',
  tags: ['autodocs'],
  render: () => new EmberNexusGeneralEditor(),
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
    `<ember-nexus-general-editor uuid="${args.uuid}"></ember-nexus-general-editor>`;


type Story = StoryObj<typeof EmberNexusGeneralEditor>;


const Primary: Story = Template.bind({});
Primary.args = {
  uuid: '8693498b-b58d-4210-b8ea-41c5a9adbe5f'
};

export {Primary, EmberNexusGeneralEditor};
