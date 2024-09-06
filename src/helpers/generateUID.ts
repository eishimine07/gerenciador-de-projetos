export default function generateUID(): number {
  return parseInt(`${Date.now()}${Math.random().toString(36).slice(2, 9)}`);
}
