import {Router} from '@vaadin/router';
import {Index} from "./page/index";


const router = new Router(document.getElementById('app'));
router.setRoutes([
  {path: '/', component: 'ember-nexus-page-index'},
]);

export default router;
export {Index};