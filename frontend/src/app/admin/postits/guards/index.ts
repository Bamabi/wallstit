import { PostitsGuard } from './postits-guard';
import { PostitsCreateGuard } from './postits-create-guard';
import { PostitsUpdateGuard } from './postits-update-guard';
import { PostitsDeleteGuard } from './postits-delete-guard';

export const USERS_GUARD_PROVIDERS = [
  PostitsGuard,
  PostitsCreateGuard,
  PostitsUpdateGuard,
  PostitsDeleteGuard
];

export {
  PostitsGuard,
  PostitsCreateGuard,
  PostitsUpdateGuard,
  PostitsDeleteGuard
};
