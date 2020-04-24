import {Entity, hasMany, model, property} from '@loopback/repository';
import {Comment, CommentWithRelations} from './comment.model';

@model()
export class Project extends Entity {
  @property({
    type: 'string',
    id: true,
    defaultFn: 'uuidv4',
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  city: string;

  @property({
    type: 'string',
    required: true,
  })
  district: string;

  @property({
    type: 'string',
  })
  postCode?: string;

  @property({
    type: 'string',
  })
  address?: string;

  @property({
    type: 'date',
  })
  constructedAt?: string;

  @property({
    type: 'date',
  })
  finishedAt?: string;

  @property({
    type: 'boolean',
    default: false,
  })
  verified?: boolean;

  @property({
    type: 'string',
  })
  investor?: string;

  @property({
    type: 'string',
  })
  area?: string;

  @property({
    type: 'date',
  })
  modifiedAt?: string;

  @property({
    type: 'date',
    required: false,
    defaultFn: 'now',
  })
  createdAt: string;

  @hasMany(() => Comment)
  comments: Comment[];

  constructor(data?: Partial<Project>) {
    super(data);
  }
}

export interface ProjectRelations {
  // describe navigational properties here
  comments?: CommentWithRelations[];
}

export type ProjectWithRelations = Project & ProjectRelations;
