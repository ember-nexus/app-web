import { EmberNexusError } from './EmberNexusError';

/**
 * Parse error class.
 */
class ParseError extends EmberNexusError {
  constructor(message?: string) {
    super(message);
    this.name = 'ParseError';
  }
}

export { ParseError };
