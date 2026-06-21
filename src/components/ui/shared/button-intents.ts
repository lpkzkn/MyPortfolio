/**
 * ボタン系コンポーネント（SimpleButton, RoundButton など）で共通の
 * 色バリアント。形状が異なるコンポーネント間でも intent の語彙を統一し、
 * 型の不整合（片方だけ 'primary' で片方は 'main' になっている、等）を防ぐ。
 */
export type ButtonIntent = 'primary' | 'secondary' | 'danger'

export const BUTTON_INTENTS: readonly ButtonIntent[] = ['primary', 'secondary', 'danger']
