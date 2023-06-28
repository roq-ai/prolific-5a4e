import { StartupInterface } from 'interfaces/startup';
import { GetQueryInterface } from 'interfaces';

export interface ContentInterface {
  id?: string;
  title: string;
  description?: string;
  startup_id?: string;
  created_at?: any;
  updated_at?: any;

  startup?: StartupInterface;
  _count?: {};
}

export interface ContentGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  description?: string;
  startup_id?: string;
}
