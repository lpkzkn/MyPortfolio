import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Tailwindクラスを結合するユーティリティ。
 * clsxで条件付きクラスを組み立て、twMergeで重複・competing classを解決する。
 * 例: cn('px-2', isLarge && 'px-4') -> 'px-4' (後勝ちで正しく解決される)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
