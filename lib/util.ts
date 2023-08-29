export function makeCloudinaryThumb(src: string, size = 200) {
  return src ? src.replace(/\/upload\/(.*?)v/, `/upload/c_fill,h_${size},w_${size}/v`) : undefined;
}
