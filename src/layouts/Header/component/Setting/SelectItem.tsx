import type { BasicOptions } from '@/types/global';

const SelectItem: React.FC = () => {
  return <></>;
};
export default SelectItem;

export interface SelectItemProps {
  title?: string;
  disabled?: boolean;
  placeholder?: string;
  items?: BasicOptions;
}
