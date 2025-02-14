// lib/uuid.mock.ts
import { fn } from '@storybook/test';

import * as actual from './uuid';

export const uuidv4 = fn(actual.uuidv4).mockName('uuidv4');