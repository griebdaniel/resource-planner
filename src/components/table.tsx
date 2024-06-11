import React, { ReactNode } from "react";
import { cn } from "@/utils/cn";

interface TableProps {
  children: ReactNode;
  className?: string;
}

export const Table: React.FC<TableProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <table
      className={cn("min-w-full divide-y divide-gray-200", className)}
      {...props}
    >
      {children}
    </table>
  );
};

interface TableSectionProps {
  children: ReactNode;
  className?: string;
}

export const TableHeader: React.FC<TableSectionProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <thead className={cn("bg-gray-50", className)} {...props}>
      {children}
    </thead>
  );
};

export const TableBody: React.FC<TableSectionProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <tbody
      className={cn("bg-white divide-y divide-gray-200", className)}
      {...props}
    >
      {children}
    </tbody>
  );
};

export const TableRow: React.FC<TableSectionProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <tr className={cn("", className)} {...props}>
      {children}
    </tr>
  );
};

export const TableCell: React.FC<TableSectionProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <td className={cn("px-6 py-4 whitespace-nowrap", className)} {...props}>
      {children}
    </td>
  );
};

export const TableColumn: React.FC<TableSectionProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <th
      className={cn(
        "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
        className,
      )}
      {...props}
    >
      {children}
    </th>
  );
};
