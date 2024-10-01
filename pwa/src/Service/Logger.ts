import log from 'loglevel';
import { Service } from 'typedi';

@Service()
class Logger {
  constructor() {
    log.setDefaultLevel('trace');
  }

  debug(message): void {
    log.debug(message);
  }

  error(message): void {
    log.error(message);
  }

  info(message): void {
    log.info(message);
  }

  warn(message): void {
    log.warn(message);
  }
}

export { Logger };
