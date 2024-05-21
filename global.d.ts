import { LoDashStatic } from 'lodash';

declare global {
  const _: LoDashStatic;
  const subtract: (minuend: number, subtrahend: number) => number;
}

export default global;
