# Branching Strategy Documentation

## Main branches
- **main**
  - Must remain **empty**.
  - Contains only `README.md`.
  - Used only for the **final merge** from `develop` after the project is completed.

- **develop**
  - Main working branch.
  - All task branches (feature, fix, chore, test) are created from here.

## Branch types
- **feature/** — For developing new features.  
- **fix/** — For bug fixes.  
- **chore/** — For technical and infrastructure tasks.  
- **test/** — For writing and improving tests.  

## Workflow
1. New task → create a branch from `develop` with the proper prefix.  
2. After finishing → open a PR into `develop`.  
3. Once reviewed and approved → merge into `develop`.  
4. At the end of the project → open a PR from `develop` into `main`.  

## Rules
- Branch names must be **short and meaningful**.  
- **Feature branches** are usually kept until the end of development.  
- **Fix, chore, and test branches** should be deleted after merging.  
- Direct commits to `main` are forbidden.  
- `develop` accepts changes only through PRs.  
