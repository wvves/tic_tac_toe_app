export function checkWin(arr: string[], winCombinations: Array<Array<number>>) {
  for(const combination of winCombinations) {
    const [a, b, c] = combination;
    if(arr[a] && arr[a] === arr[b] && arr[a] === arr[c]) {
      return true;
    }
  }
  return false
}

export function checkDraw(arr: string[]) {
  return [...arr].every((element) => element !== '')
}