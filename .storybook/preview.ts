import type { Preview } from "@storybook/web-components";
import '../src/index.css';
import EmberNexus from "@ember-nexus/web-sdk";
import Options from "@ember-nexus/web-sdk/dist/Options";
import { Logger } from 'tslog';


const logger= new Logger({
  name: 'ember-nexus-app',
  // type: "json"
  type: 'pretty',
});
logger.settings.minLevel = 0;
const options = new Options();
options.setApiHost('http://localhost:80/');
options.setToken('secret-token:PIPeJGUt7c00ENn8a5uDlc');
const emberNexus = EmberNexus.create(logger, options);
emberNexus.bindToDomElement(document.body);
window.emberNexus = emberNexus;
// emberNexus.debug();

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  }
};

export default preview;
