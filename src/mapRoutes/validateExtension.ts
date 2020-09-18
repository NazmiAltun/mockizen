export default function (route: string, extension: string): boolean {
  const extIndex = route.indexOf('.');

  if (extIndex === -1) {
    return false;
  }
  const subStr = route.substr(extIndex, extension.length);
  const indexAfterExt = extIndex + extension.length;
  const charAfterExtension = route.length > indexAfterExt ? route[indexAfterExt] : '';

  return subStr === extension && (charAfterExtension === '' || charAfterExtension === '?');
}
