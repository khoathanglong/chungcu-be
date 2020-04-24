import {Getter, inject} from '@loopback/core';
import {
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  repository,
} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Comment, Project, ProjectRelations} from '../models';
import {CommentRepository} from './comment.repository';

export class ProjectRepository extends DefaultCrudRepository<
  Project,
  typeof Project.prototype.id,
  ProjectRelations
> {
  public readonly comments: HasManyRepositoryFactory<
    Comment,
    typeof Project.prototype.id
  >;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('CommentRepository')
    protected commentRepositoryGetter: Getter<CommentRepository>,
  ) {
    super(Project, dataSource);
    this.comments = this.createHasManyRepositoryFactoryFor(
      'comments',
      commentRepositoryGetter,
    );
    this.registerInclusionResolver('comments', this.comments.inclusionResolver);
  }
}
