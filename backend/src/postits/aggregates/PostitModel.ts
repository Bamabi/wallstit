import { MongoModelBase } from '../../core/MongoModelBase';

/**
 * @swagger
 * definitions:
 *   PostitModel:
 *     type: object
 *     required:
 *       - id
 *       - author
 *       - quote
 *       - date
 *     properties:
 *       id:
 *         type: string
 *       author:
 *         type: string
 *       quote:
 *         type: string
 *       date:
 *         type: string
 *         format: date
 *       toPerson:
 *         type: string
 *       context:
 *          type: string
 *       reply:
 *          type: string 
 */
export class PostitModel extends MongoModelBase {
    author: string;
    quote: string;
    date: Date;
    toPerson?: string;
    context?: string;
    reply?: string;
}
