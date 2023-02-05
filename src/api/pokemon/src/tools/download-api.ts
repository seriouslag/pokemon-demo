import { spawnSync } from 'child_process';

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const cloneRepo = async (name: string) => {
  spawnSync('mkdir', ['-p', 'temp']);
  spawnSync('git', ['clone', `git@github.com:seriouslag/${name}.git`, '--single-branch'], {
    cwd: 'temp',
    stdio: 'inherit',
  });
  await wait(100);
};

const getApi = async ({ name, shortName, path }: {
  /** The name of the repository */
  name: string;
  /** The path to the OpenAPI spec file */
  path: string;
  /** The name that will be used in logs */
  shortName?: string;
}) => {
  const short = shortName ?? name;
  console.log(`Getting api for ${short}`);
  spawnSync('rm', ['-rf', 'temp']);
  spawnSync('rm', ['.tmp']);
  spawnSync('rm', ['-rf', 'api']);
  spawnSync('mkdir', ['-p', 'api']);
  console.log(`${short}: cloning repo`);
  await cloneRepo(name);
  console.log(`${short}: copying api`);
  spawnSync('cp', [`temp/${name}/${path}`, 'api/api.yaml'], { stdio: 'inherit' });
  console.log(`${short}: cleanup`);
  spawnSync('rm', ['-rf', 'temp']);
};

getApi({
  name: 'pokemon-api-spec',
  path: './spec.yaml',
});
