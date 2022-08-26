# Tests existence check
Check added to ensure added/modified files have tests

## Motivation
In order to improve test coverage, we need to ensure that proposed changes have test.

This check is very basic, it only checks that if `foo.ts` file is added/modified - `foo.test.ts` is also expected.

That should encourage developers to submit changes along with tests.

## Inputs
### `path`
**Required** The path a folder where the code lives.

### `extensions`
**Required** An array of file extensions to check.

## Outputs
TODO

## Example usage
```
uses: mrded/template-ts-lib/.github/actions/tests-existence-checker 
with:
  path: 'src/'
```

## TODO:
- [x] A detailed description of what the action does.
- [ ] Required input and output arguments.
- [ ] Optional input and output arguments.
- [ ] Secrets the action uses.
- [ ] Environment variables the action uses.
- [ ] An example of how to use your action in a workflow.
