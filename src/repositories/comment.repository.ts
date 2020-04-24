import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Comment, CommentRelations, ReplyComment} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {ReplyCommentRepository} from './reply-comment.repository';

export class CommentRepository extends DefaultCrudRepository<
  Comment,
  typeof Comment.prototype.id,
  CommentRelations
> {

  public readonly replyComments: HasManyRepositoryFactory<ReplyComment, typeof Comment.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('ReplyCommentRepository') protected replyCommentRepositoryGetter: Getter<ReplyCommentRepository>,
  ) {
    super(Comment, dataSource);
    this.replyComments = this.createHasManyRepositoryFactoryFor('replyComments', replyCommentRepositoryGetter,);
    this.registerInclusionResolver('replyComments', this.replyComments.inclusionResolver);
  }
}
