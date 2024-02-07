import { MoreHorizontal } from "../../../assets/svgs/Icons/MoreHorizontal";
import { colors } from "../../../theme";
import { Dropdown } from "../../containers";

interface Props {
  buttons: {
    label: string;
    onClick: any;
  }[];
}

export const RowActions = ({ buttons }: Props) => {
  return (
    <Dropdown>
      <ul className="drop-shadow-md">
        {buttons.map((item, index) => (
          <li key={index} onClick={item.onClick}>
            {item.label}
          </li>
        ))}
      </ul>
      <MoreHorizontal size={24} color={colors.mainColor} />
    </Dropdown>
  );
};
