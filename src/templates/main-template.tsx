import { IChildren } from "../interface/children-interface";

function MainTemplate({ children }: IChildren) {
  return <div>{children}</div>;
}

export default MainTemplate;
