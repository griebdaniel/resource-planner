import { Button } from "@nextui-org/react";
import { DeleteIcon, EditIcon } from "lucide-react";

interface ActionCellContentProps {
  deleteAllowed: boolean;
  editAllowed: boolean;
}

export const ActionCellContent: React.FC<ActionCellContentProps> = ({
  deleteAllowed,
  editAllowed,
}) => {
  return (
    <div className="flex flex-row gap-2">
      <Button isIconOnly>
        <DeleteIcon />
      </Button>
      <Button isIconOnly>
        <EditIcon />
      </Button>
    </div>
  );
};
