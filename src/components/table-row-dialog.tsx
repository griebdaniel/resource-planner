import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { TableColumn } from "./data-table";

export interface TableRowDialogProps {
  tableColumns: TableColumn[];
  row?: Record<string, unknown>;
  isOpen: boolean;
  onOpenChange: () => void;
  onSave: (data: Record<string, unknown>) => void;
}

export default function TableRowDialog({
  tableColumns,
  row = {},
  isOpen,
  onOpenChange,
  onSave,
}: TableRowDialogProps) {
  const [formData, setFormData] = useState<Record<string, unknown>>(row);

  const handleChange = (key: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    onSave(formData);
    onOpenChange();
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {row ? "Edit Row" : "Insert Row"}
              </ModalHeader>
              <ModalBody>
                {tableColumns.map((column) => (
                  <Input
                    key={column.key}
                    label={column.name}
                    value={formData[column.key] as string}
                    onChange={(e) => handleChange(column.key, e.target.value)}
                    fullWidth
                  />
                ))}
              </ModalBody>
              <ModalFooter>
                <Button onClick={onClose} color="secondary">
                  Cancel
                </Button>
                <Button onClick={handleSave} color="primary">
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
