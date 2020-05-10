import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    foreignKeys: {
      // eslint-disable-next-line @typescript-eslint/camelcase
      fk_replyComment_commentId: {
        name: 'fk_replyComment_commentId',
        entity: 'Comment',
        entityKey: 'id',
        foreignKey: 'commentid',
      },
    },
  },
})
export class ReplyComment extends Entity {
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
    type: 'date',
    required: true,
    defaultFn: 'now',
  })
  createdAt: string;

  @property({
    type: 'string',
    required: true,
    default: 'Anonymous',
  })
  displayName: string;

  @property({
    type: 'number',
  })
  commentId?: number;

  constructor(data?: Partial<ReplyComment>) {
    super(data);
  }
}

export interface ReplyCommentRelations {
  // describe navigational properties here
}

export type ReplyCommentWithRelations = ReplyComment & ReplyCommentRelations;
