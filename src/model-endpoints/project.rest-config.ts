import {ModelCrudRestApiConfig} from '@loopback/rest-crud';
import {Project} from '../models';

const config: ModelCrudRestApiConfig = {
  model: Project,
  pattern: 'CrudRest',
  dataSource: 'db',
  basePath: '/projects',
};
module.exports = config;
