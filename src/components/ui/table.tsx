
import * as React from "react";
import { cn } from "../../lib/utils";

export const Table: React.FC<React.HTMLProps<HTMLTableElement>> = ({ children, className, ...props }) => (
  <table className={cn("min-w-full table-auto", className)} {...props}>
    {children}
  </table>
);

export const TableHeader: React.FC<React.HTMLProps<HTMLTableSectionElement>> = ({ children, className, ...props }) => (
  <thead className={cn("bg-gray-100", className)} {...props}>
    {children}
  </thead>
);

export const TableRow: React.FC<React.HTMLProps<HTMLTableRowElement>> = ({ children, className, ...props }) => (
  <tr className={cn("border-b", className)} {...props}>
    {children}
  </tr>
);

export const TableHead: React.FC<React.HTMLProps<HTMLTableHeaderCellElement>> = ({ children, className, ...props }) => (
  <th className={cn("px-6 py-4 text-left text-sm font-medium text-gray-500", className)} {...props}>
    {children}
  </th>
);

export const TableBody: React.FC<React.HTMLProps<HTMLTableSectionElement>> = ({ children, className, ...props }) => (
  <tbody className={cn("divide-y divide-gray-200", className)} {...props}>
    {children}
  </tbody>
);

export const TableCell: React.FC<React.HTMLProps<HTMLTableCellElement>> = ({ children, className, ...props }) => (
  <td className={cn("px-6 py-4 whitespace-nowrap text-sm text-gray-900", className)} {...props}>
    {children}
  </td>
);
