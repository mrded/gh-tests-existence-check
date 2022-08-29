# Tests existence check
Check added to ensure added/modified files have tests

## Problem
Sometimes developers forget to write tests, which neglects the code quality.

## Solution
It's fine, we only need a gentle reminder.
This GitHub Action is checking that every added/modified code file also has a test.

**Example:** if `foo.ts` file is added/modified - `foo.test.ts` is also expected.

That should encourage developers to submit changes along with tests.

## No-gos
The GH action is made as simple as possible, so that it may lack some setup flexibility. 

For example, if you want to target multiple file extensions, you will need to add separate actions per extension.

## Inputs
### `target-file-path-prefix`
**Required** The code file path prefix to check. Example: `src/`

### `target-file-path-suffix`
**Required** The code file path suffix (aka extension) to check. Example: `.ts`

### `test-file-path-prefix`
**Required** The test file path prefix to check. Example: `tests/`

### `test-file-path-suffix`
**Required** The test file path suffix to check. Example: `.test.ts`

### `error-message`
The message in case test was not found. Example: `:file does not have a corresponding :test test file`

### `repo-token`
Access token to authenticate on behalf of the GitHub App

### `repo-name`
Repository name, in case you need to override it.

### `repo-owner`
Repository owner, in case you need to override it.

### `pull-number`
Pull request number to check, in case you need to override it.

## Example usage
**Option 1:** Directory structure when having separate folders for source and tests:
```
|-- src/
|   |-- item.ts
|   `-- util/
|      `-- helper.ts
`-- test/
    |-- item.test.ts
    `-- util/
       `-- helper.test.ts
```
Workflow:

```yaml
uses: mrded/gh-tests-existence-check@main
with:
  target-file-path-prefix: src/
  target-file-path-suffix: .ts
  test-file-path-prefix: test/ 
  test-file-path-suffix: .test.ts
```

**Option 2:** Directory structure when having both types of files in the same directory:
```
`-- src/
    |-- item.ts
    |-- item.test.ts
    `-- util/
        |-- helper.ts
        `-- helper.test.ts
```
Workflow:

```yaml
uses: mrded/gh-tests-existence-check@main
with:
  target-file-path-prefix: src/
  target-file-path-suffix: .ts
  test-file-path-prefix: src/ 
  test-file-path-suffix: .test.ts
```
