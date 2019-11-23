import { Instance } from 'mobx-state-tree';
import File from '../models/File';

type FileType = Instance<typeof File>;

type ResponseType<T = any> =
    | {
          success: false;
      }
    | {
          success: true;
          data: T;
      };
