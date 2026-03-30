import { Children, type ReactNode } from "react";

type AnimatedListProps = {
  children: ReactNode;
  staggerDelay?: number;
};

export function AnimatedList({
  children,
  staggerDelay = 150,
}: AnimatedListProps) {
  return (
    <>
      {Children.map(children, (child, index) => (
        <div
          className="stagger-item"
          style={{ animationDelay: `${index * staggerDelay}ms` }}
        >
          {child}
        </div>
      ))}
    </>
  );
}
