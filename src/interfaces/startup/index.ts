import { ContentInterface } from 'interfaces/content';
import { SubscriptionInterface } from 'interfaces/subscription';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface StartupInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  content?: ContentInterface[];
  subscription?: SubscriptionInterface[];
  user?: UserInterface;
  _count?: {
    content?: number;
    subscription?: number;
  };
}

export interface StartupGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
