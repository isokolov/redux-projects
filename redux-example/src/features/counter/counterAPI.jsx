export function fetchCount(count = 1) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: count });
    }, 500);
  });
}
