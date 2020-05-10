import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Comment,
  ReplyComment,
} from '../models';
import {CommentRepository} from '../repositories';

export class CommentReplyCommentController {
  constructor(
    @repository(CommentRepository) protected commentRepository: CommentRepository,
  ) { }

  @get('/comments/{id}/reply-comments', {
    responses: {
      '200': {
        description: 'Array of Comment has many ReplyComment',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ReplyComment)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<ReplyComment>,
  ): Promise<ReplyComment[]> {
    return this.commentRepository.replyComments(id).find(filter);
  }

  @post('/comments/{id}/reply-comments', {
    responses: {
      '200': {
        description: 'Comment model instance',
        content: {'application/json': {schema: getModelSchemaRef(ReplyComment)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Comment.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ReplyComment, {
            title: 'NewReplyCommentInComment',
            exclude: ['id'],
            optional: ['commentId']
          }),
        },
      },
    }) replyComment: Omit<ReplyComment, 'id'>,
  ): Promise<ReplyComment> {
    return this.commentRepository.replyComments(id).create(replyComment);
  }

  @patch('/comments/{id}/reply-comments', {
    responses: {
      '200': {
        description: 'Comment.ReplyComment PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ReplyComment, {partial: true}),
        },
      },
    })
    replyComment: Partial<ReplyComment>,
    @param.query.object('where', getWhereSchemaFor(ReplyComment)) where?: Where<ReplyComment>,
  ): Promise<Count> {
    return this.commentRepository.replyComments(id).patch(replyComment, where);
  }

  @del('/comments/{id}/reply-comments', {
    responses: {
      '200': {
        description: 'Comment.ReplyComment DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ReplyComment)) where?: Where<ReplyComment>,
  ): Promise<Count> {
    return this.commentRepository.replyComments(id).delete(where);
  }
}
