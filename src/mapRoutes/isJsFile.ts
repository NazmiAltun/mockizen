export default function (route: string): boolean {
  const extIndex = route.indexOf('.');

  return extIndex === -1 ? false : route.substr(extIndex, '.js'.length) === '.js';
}
