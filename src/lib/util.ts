export const exists = (value: unknown) => value != null
export const lerp = (a: number, b: number, t: number): number => a + (b - a) * t
export const clamp = (value: number, limit: number) => Math.max(Math.min(value, limit), -limit)

export const pi = Math.PI

const between = (
  value: number,
  lowerBound: number,
  upperBound: number,
  option:
    | 'include'
    | 'exclude'
    | 'include-lower'
    | 'include-upper'
    | 'exclude-lower'
    | 'exclude-upper' = 'include',
) =>
  option === 'include'
    ? lowerBound <= value && value <= upperBound
    : option === 'exclude'
      ? lowerBound < value && value < upperBound
      : option === 'exclude-lower' || option === 'include-upper'
        ? lowerBound < value && value <= upperBound
        : option === 'include-lower' || option === 'exclude-upper'
          ? lowerBound <= value && value < upperBound
          : false

export default between
