import {DefaultCrudRepository} from '@loopback/repository';
import {ReplyComment, ReplyCommentRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ReplyCommentRepository extends DefaultCrudRepository<
  ReplyComment,
  typeof ReplyComment.prototype.id,
  ReplyCommentRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(ReplyComment, dataSource);
  }
}
