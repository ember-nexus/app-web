import {Router} from '@vaadin/router';
import {Index} from "./page/index/index.ts";
import {Search} from "./page/search/search.ts";
import {Logger} from "tslog";
import Options from "@ember-nexus/web-sdk/dist/Options";
import EmberNexus from "@ember-nexus/web-sdk";


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

const router = new Router(document.getElementById('app'));
router.setRoutes([
  {path: '/', component: 'ember-nexus-page-index'},
  {path: '/search', component: 'ember-nexus-page-search'},
]);

export default router;
export {Index, Search};