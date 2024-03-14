import * as React from 'react'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function useMediaQuery(query: string) {
  const [value, setValue] = React.useState(false)

  React.useEffect(() => {
    function onChange(event: MediaQueryListEvent) {
      setValue(event.matches)
    }

    const result = matchMedia(query)
    result.addEventListener('change', onChange)
    setValue(result.matches)

    return () => result.removeEventListener('change', onChange)
  }, [query])

  return value
}


export function calculateValuesFromUUID(uuid: string): [number, number, number] {
  // Simple hash function applied to subsections of the UUID
  function hashSubsection(subsection: string): number {
    let hash = 0;
    for (let i = 0; i < subsection.length; i++) {
      hash = (hash << 5) - hash + subsection.charCodeAt(i);
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  }

  // Divide the UUID into three parts and hash each part
  const part1 = uuid.substring(0, 9); // First segment
  const part2 = uuid.substring(9, 18); // Middle segment
  const part3 = uuid.substring(18); // Last segment

  // Calculate a base hash for each part
  let base1 = hashSubsection(part1);
  let base2 = hashSubsection(part2);
  let base3 = hashSubsection(part3);

  // Map each base hash to the specified ranges through modular arithmetic and scaling
  let value1 = (base1 % 34); // 0-33
  let value2 = (base2 % 33) + 34; // 34-66
  let value3 = (base3 % 34) + 67; // 67-100

  return [value1, value2, value3];
}
