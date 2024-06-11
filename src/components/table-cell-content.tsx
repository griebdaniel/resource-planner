import { Button } from "@nextui-org/react";
import { TableColumn, TableConfiguration } from "./data-table";
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
        <DeleteIcon />
      </Button>
    </div>
  );
};
