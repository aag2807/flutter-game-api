// deno-lint-ignore-file

type Obj = { [key: string]: any };

export const mapToArray = (obj: Obj): any[] => {
  const map: any[] = [];

  for (let key in obj) {
    map.push(obj[key]);
  }

  return map;
};
