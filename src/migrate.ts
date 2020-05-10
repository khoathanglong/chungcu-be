const projectData = require('../projectData.json');
import {ApartmentReviewApplication} from './application';
import {ProjectRepository} from './repositories';
export async function migrate(args: string[]) {
  const existingSchema = args.includes('--rebuild') ? 'drop' : 'alter';
  console.log('Migrating schemas (%s existing schema)', existingSchema);

  const app = new ApartmentReviewApplication();
  await app.boot();
  await app.migrateSchema({
    existingSchema,
    models: ['Project', 'Comment', 'ReplyComment'],
  });

  // import data
  const projectRepo = await app.getRepository(ProjectRepository);
  const {count} = await projectRepo.count();
  if (count === 0) {
    console.log(count, projectData.length);
    await seedInitData(projectData, projectRepo);
  }

  // Connectors usually keep a pool of opened connections,
  // this keeps the process running even after all work is done.
  // We need to exit explicitly.
  process.exit(0);
}

migrate(process.argv).catch(err => {
  console.error('Cannot migrate database schema', err);
  process.exit(1);
});
async function seedInitData(
  seedingData: Array<Object>,
  projectRepo: ProjectRepository,
) {
  // eslint-disable-next-line @typescript-eslint/prefer-for-of
  for (let i = 0; i < seedingData.length; i++) {
    await projectRepo
      .create(projectData[i])
      .catch(error => console.error(error));
    if (i % 10 === 0) console.info(`imported ${i} project items to database`);
    if (i === seedingData.length - 1)
      console.info(`finish, imported ${i} project items to database`);
  }
}
