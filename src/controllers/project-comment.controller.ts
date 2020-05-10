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
  Project,
  Comment,
} from '../models';
import {ProjectRepository} from '../repositories';

export class ProjectCommentController {
  constructor(
    @repository(ProjectRepository) protected projectRepository: ProjectRepository,
  ) { }

  @get('/projects/{id}/comments', {
    responses: {
      '200': {
        description: 'Array of Project has many Comment',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Comment)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Comment>,
  ): Promise<Comment[]> {
    return this.projectRepository.comments(id).find(filter);
  }

  @post('/projects/{id}/comments', {
    responses: {
      '200': {
        description: 'Project model instance',
        content: {'application/json': {schema: getModelSchemaRef(Comment)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Project.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comment, {
            title: 'NewCommentInProject',
            exclude: ['id'],
            optional: ['projectId']
          }),
        },
      },
    }) comment: Omit<Comment, 'id'>,
  ): Promise<Comment> {
    return this.projectRepository.comments(id).create(comment);
  }

  @patch('/projects/{id}/comments', {
    responses: {
      '200': {
        description: 'Project.Comment PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comment, {partial: true}),
        },
      },
    })
    comment: Partial<Comment>,
    @param.query.object('where', getWhereSchemaFor(Comment)) where?: Where<Comment>,
  ): Promise<Count> {
    return this.projectRepository.comments(id).patch(comment, where);
  }

  @del('/projects/{id}/comments', {
    responses: {
      '200': {
        description: 'Project.Comment DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Comment)) where?: Where<Comment>,
  ): Promise<Count> {
    return this.projectRepository.comments(id).delete(where);
  }
}
