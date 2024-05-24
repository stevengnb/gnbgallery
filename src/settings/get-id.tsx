export function getId(id: string) {
  const ids = id.split("token=")[1];
  const lastChar = ids.slice(-15);
  return lastChar;
}
