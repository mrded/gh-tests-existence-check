const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');

const getChangedFiles = async ({ repo_token, repo_owner, repo_name, pull_number }) => {
  const octokit = github.getOctokit(repo_token);

  // TODO: go over pagination here. it returns only 30 files.
  const res = await octokit.rest.pulls.listFiles({
    owner: repo_owner,
    repo: repo_name,
    pull_number,
  });

  return res.data
    .filter(({ status }) => ['modified', 'added'].indexOf(status) != -1)
    .map(({ filename }) => filename);
}

async function run() {
  const repo_owner = core.getInput('repo-owner');
  const repo_name = core.getInput('repo-name');
  const repo_token = core.getInput('repo-token');
  const pull_number = core.getInput('pull-number');

  const target_file_prefix = core.getInput('target-file-prefix');
  const target_file_suffix = core.getInput('target-file-suffix');

  const test_file_prefix = core.getInput('test-file-prefix');
  const test_file_suffix = core.getInput('test-file-suffix');

  const error_message = core.getInput('error-message');

  const files_all = await getChangedFiles({ repo_name, repo_owner, repo_token, pull_number })

  const files_targeted = files_all
    .filter(file => file.startsWith(target_file_prefix))
    .filter(file => file.endsWith(target_file_suffix))
    .filter(file => !file.endsWith(test_file_suffix));

  files_targeted.forEach(file => {
    const test_file = file
      // TODO: this is not ideal, and may replace wrong strings.
      .replace(target_file_prefix, test_file_prefix)
      .replace(target_file_suffix, test_file_suffix);

    if (!fs.existsSync(test_file)) {
      core.setFailed(error_message.replace(':file', file).replace(':test', test_file));
    }
  });
}

run().catch((err) => {
  console.error(err);
  core.setFailed(err.message);
  process.exitCode = 1;
});
