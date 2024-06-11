import { Button } from "@nextui-org/react";
import { DeleteIcon, EditIcon } from "lucide-react";

interface ActionCellContentProps {
  deleteAllowed: boolean;
  editAllowed: boolean;
  onDelete: () => void;
}

export const ActionCellContent: React.FC<ActionCellContentProps> = ({
  deleteAllowed,
  editAllowed,
  onDelete,
}) => {
  return (
    <div className="flex flex-row gap-2">
      {editAllowed && (
        <Button isIconOnly onPress={() => {}}>
          <EditIcon />
        </Button>
      )}
      {deleteAllowed && (
        <Button isIconOnly onPress={onDelete}>
          <DeleteIcon />
        </Button>
      )}
    </div>
  );
};
