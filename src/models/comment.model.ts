import {Entity, hasMany, model, property} from '@loopback/repository';
import {ProjectWithRelations} from './project.model';
import {ReplyComment, ReplyCommentWithRelations} from './reply-comment.model';

@model({
  settings: {
    foreignKeys: {
      // eslint-disable-next-line @typescript-eslint/camelcase
      fk_comment_projectId: {
        name: 'fk_comment_projectId',
        entity: 'Project',
        entityKey: 'id',
        foreignKey: 'projectid',
      },
    },
  },
})
export class Comment extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  content: string;

  @property({
    type: 'string',
    required: true,
    default: 'Anonymous',
  })
  displayName: string;

  @property({
    type: 'date',
    defaultFn: 'now',
    required: true,
  })
  createdAt: string;

  @property({
    type: 'string',
  })
  projectId?: string;

  @hasMany(() => ReplyComment)
  replyComments: ReplyComment[];

  constructor(data?: Partial<Comment>) {
    super(data);
  }
}

export interface CommentRelations {
  // describe navigational properties here
  replyComments?: ReplyCommentWithRelations[];
  projectId?: ProjectWithRelations;
}

export type CommentWithRelations = Comment & CommentRelations;
