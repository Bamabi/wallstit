import { Service, Inject } from 'typedi';
import * as bcrypt from 'bcrypt-nodejs';

import { PostitModel } from './aggregates/PostitModel';
import { MongoService, PaginationFilter } from '../core/MongoService';
import { MongoCollection } from '../core/decorators';
import { NotFoundError, UnprocessableEntityError } from '../errors';

/**
 * Represents the postits service.
 * @class
 * @extends {MongoService<PostitModel>}
 */
@Service()
@MongoCollection('Postits')
export class PostitsService extends MongoService<PostitModel> {

}

export { PostitModel, PaginationFilter };
