export default function (route: string, extension: string): boolean {
  const extIndex = route.indexOf('.');

  return extIndex === -1 ? false : route.substr(extIndex, extension.length) === extension;
}
