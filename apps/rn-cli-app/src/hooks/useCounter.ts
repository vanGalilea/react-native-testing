import {useState} from 'react';

export interface IUseCounterProps {
  initialCount?: number;
  step?: number;
}

export interface IUseCounterResult {
  count: number;
  increment(): void;
  decrement(): void;
}
export default ({
  initialCount = 0,
  step = 1,
}: IUseCounterProps = {}): IUseCounterResult => {
  const [count, setCount] = useState<number>(initialCount);
  const increment = () => setCount(c => c + step);
  const decrement = () => setCount(c => c - step);
  return {count, increment, decrement};
};
