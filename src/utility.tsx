export const arrayEqual = <T extends {}>(a: T[], b: T[]): boolean => { // Need to put "extends {}" to tell the compiler that <T> is generics, not a JSX tag
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
};