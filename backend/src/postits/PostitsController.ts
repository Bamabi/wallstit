import { JsonController, Get, Post, Put, Param, QueryParam, Delete, Body, UseBefore, Req } from 'routing-controllers';
import { Service, Inject } from 'typedi';
import { Request } from 'express';
import _ = require('lodash');
import { PostitModel, PostitsService, PaginationFilter } from './PostitsService';
import { IsLogged, Authorize } from '../config/authentication';
import { UnprocessableEntityError } from '../errors';
import * as Rights from '../core/Rights';

const postitFilter = { };

@Service()
@JsonController('/postits')
export class PostitsController {

    @Inject()
    postitsService: PostitsService;
  
    constructor() {
    }

    /**
     * Gets the user list filter by search text.
     * @method
     * @param {string} search The searching terms.
     * @returns The mongo filter.
     */
    private getPostitListFilter(search: string) {
        let filter = {} as any;
        if (!search || search.replace(/ /ig, '') === '') {
            return filter;
        }

        filter = {
            '$or': [
                { 'author': new RegExp(search, 'ig') },
                { 'quote': new RegExp(search, 'ig') },
                { 'date': new RegExp(search, 'ig') },
                { 'context': new RegExp(search, 'ig') },
                { 'toPerson': new RegExp(search, 'ig') },
                { 'reply': new RegExp(search, 'ig') },
            ]
        };

        return filter;
    }
    /**
     * @swagger
     * /api/postits:
     *   get:
     *     description: Returns all postits
     *     operationId: getAll
     *     tags:
     *       - Postits
     *     produces:
     *       - application/json
     *       - text/plain
     *     parameters:
     *       - name: Authorization
     *         in: header
     *         description: JWT token.
     *         required: true
     *         type: string
     *       - name: search
     *         in: query
     *         description: searching terms.
     *         required: false
     *         type: string
     *       - name: sort
     *         in: query
     *         description: Sort column order.
     *         required: false
     *         type: string
     *       - name: page
     *         in: query
     *         description: Current page.
     *         required: false
     *         type: number
     *       - name: limit
     *         in: query
     *         description: Number of page element.
     *         required: false
     *         type: number
     *     responses:
     *       200:
     *         description: list of postit model
     *         schema:
     *           type: array
     *           items:
     *              $ref: '#/definitions/PostitModel'
     *     security:
     *        - jwt_token: [ ]
     */
    @Get('/')
    async getAll(
        @QueryParam('search') search: string,
        @QueryParam('sort') sort: string,
        @QueryParam('page') page: number,
        @QueryParam('limit') limit: number
        ): Promise<PostitModel[]> {
        const filter = this.getPostitListFilter(search);
        return this.postitsService.filter(filter, postitFilter, { sort, page, limit });
        //return this.postitsService.all();
    }

    
  /**
   * @swagger
   * /api/postits/count:
   *   get:
   *     description: Returns the list of postit.
   *     operationId: count
   *     tags:
   *       - Postits
   *     produces:
   *       - application/json
   *       - text/plain
   *     parameters:
   *       - name: Authorization
   *         in: header
   *         description: JWT token.
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: number of postit.
   *         schema:
   *           type: object
   *           properties:
   *             count:
   *               type: number
   *     security:
   *        - jwt_token: [ ]
   */
  @Get('/count')
  async count(@QueryParam('search') search: string): Promise<{ count: number }> {
    const filter = this.getPostitListFilter(search);
    const count = await this.postitsService.count(filter);
    return { count: count };
  }

  /**
   * @swagger
   * /api/postits/:
   *   post:
   *     description: Create a new postit.
   *     operationId: create
   *     tags:
   *       - Postits
   *     produces:
   *       - application/json
   *       - text/plain
   *     parameters:
   *       - name: Authorization
   *         in: header
   *         description: JWT token.
   *         required: true
   *         type: string
   *       - name: postitModel
   *         in: body
   *         description: The postit model.
   *         required: true
   *         schema:
   *           $ref: '#/definitions/PostitModel'
   *     responses:
   *       200:
   *         description: The created object.
   *         schema:
   *           $ref: '#/definitions/PostitModel'
   *     security:
   *        - jwt_token: [ ]
   */
  @Post('/')
  @UseBefore(IsLogged, Authorize(Rights.PostitRights.CREATE))
  async create( @Body({ required: true }) data: PostitModel) {
    return this.postitsService.save({...data, date: new Date(data.date)});
  }

  
  /**
   * @swagger
   * /api/postits/{id}:
   *   put:
   *     description: Create a new language.
   *     operationId: create
   *     tags:
   *       - Postits
   *     produces:
   *       - application/json
   *       - text/plain
   *     parameters:
   *       - name: Authorization
   *         in: header
   *         description: JWT token.
   *         required: true
   *         type: string
   *       - name: id
   *         in: path
   *         description: The lang resource identifier.
   *         required: true
   *         type: string
   *       - name: postitsModel
   *         in: body
   *         description: The postits model.
   *         required: true
   *         schema:
   *           $ref: '#/definitions/PostitModel'
   *     responses:
   *       200:
   *         description: The created object.
   *         schema:
   *           $ref: '#/definitions/PostitModel'
   *     security:
   *        - jwt_token: [ ]
   */
  @Put('/:id')
  @UseBefore(IsLogged, Authorize(Rights.PostitRights.UPDATE))
  async update(
    @Param('id') id: string,
    @Body({ required: true }) data: PostitModel
    ) {
    if (data.id !== id) {
      throw new UnprocessableEntityError('Bad language');
    }

    return this.postitsService.save(data);
  }

  /**
   * @swagger
   * /api/postits/{id}:
   *   delete:
   *     description: Delete new language.
   *     operationId: delete
   *     tags:
   *       - Postits
   *     produces:
   *       - application/json
   *       - text/plain
   *     parameters:
   *       - name: Authorization
   *         in: header
   *         description: JWT token.
   *         required: true
   *         type: string
   *       - name: id
   *         in: path
   *         description: The lang resource identifier.
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: number of postits deleted.
   *         schema:
   *           type: object
   *           properties:
   *             count:
   *               type: number
   *     security:
   *        - jwt_token: [ ]
   */
  @Delete('/:id')
  @UseBefore(IsLogged, Authorize(Rights.PostitRights.DELETE))
  async delete( @Param('id') id: string) {
    const result = await this.postitsService.removeOne(id);
    return { count: result };
  }

  /**
   * @swagger
   * /api/postits/{id}:
   *   get:
   *     description: Gets a language by its identifier.
   *     operationId: getById
   *     tags:
   *       - Postits
   *     produces:
   *       - application/json
   *       - text/plain
   *     parameters:
   *       - name: Authorization
   *         in: header
   *         description: JWT token.
   *         required: true
   *         type: string
   *       - name: id
   *         in: path
   *         description: The lang resource identifier.
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: The created object.
   *         schema:
   *           $ref: '#/definitions/PostitModel'
   *     security:
   *        - jwt_token: [ ]
   */
  @Get('/:id')
  @UseBefore(IsLogged, Authorize(Rights.PostitRights.READ, Rights.PostitRights.UPDATE))
  async getById( @Param('id') id: string) {
    return this.postitsService.get(id, { fields: { resources: 0 } });
  }
}