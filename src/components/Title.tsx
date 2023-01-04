import { PropsWithChildren } from "react";

type TitleProps = PropsWithChildren;

export const Title = ({ children }: TitleProps) => <h1>{children}</h1>;
