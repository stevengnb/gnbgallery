export function getId(id: string) {
  if (id.includes("cloudinary")) {
    const idss = id.split("/");
    var ids = idss[idss.length-1].split(".")[0];;
  } else {
    var ids = id.split("token=")[1].slice(-15);
  }

  return ids;
}
