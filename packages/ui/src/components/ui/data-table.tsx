import { type RankingInfo, rankItem } from '@tanstack/match-sorter-utils';
import {
  type Column,
  type ColumnDef,
  type ColumnFiltersState,
  type FilterFn,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  type Table as TableProps,
  useReactTable,
  type VisibilityState,
} from '@tanstack/react-table';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { cn } from '../../libs';
import { Icons } from '../icons';
import { Button } from './button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './dropdown-menu';
import { Input } from './input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './table';

declare module '@tanstack/react-table' {
  //add fuzzy filter to the filterFns
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

// Define a custom fuzzy filter function that will apply ranking info to rows (using match-sorter utils)
export const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

export type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  enableFilterBar?: boolean;
  error?: Error | null;
  isLoading?: boolean;
  isFetching?: boolean;
  totalCount?: number;
  fetchMore?: () => Promise<unknown>;
  enableVirtualization?: boolean;
  NoRowsComponent?: React.ReactNode;
};

export function DataTable<TData, TValue>({
  columns,
  data,
  enableFilterBar = false,
  error,
  isFetching,
  NoRowsComponent,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    columns,
    data,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: 'fuzzy',
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    state: {
      columnFilters,
      columnVisibility,
      globalFilter,
      rowSelection,
      sorting,
    },
  });

  return (
    <div className="flex flex-col space-y-4">
      {enableFilterBar ? (
        <DataTableToolbar
          globalOnChange={setGlobalFilter}
          globalValue={globalFilter}
          table={table}
        />
      ) : null}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {error && table.getRowModel().rows?.length ? (
              <TableRow>
                <TableCell
                  className="h-24 text-center"
                  colSpan={columns.length}
                >
                  <ErrorMessage error={error} />
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  className="h-24 text-center"
                  colSpan={columns.length}
                >
                  <NoRows
                    customComponent={NoRowsComponent}
                    isFetching={isFetching}
                    isFiltered={!!globalFilter}
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}

export function NoRows({
  isFiltered,
  isFetching,
  customComponent,
}: {
  isFiltered?: boolean;
  isFetching?: boolean;
  customComponent?: React.ReactNode;
}) {
  const { t } = useTranslation();

  return (
    <div>
      {isFiltered && !isFetching ? (
        <div>
          {t('common:no_resource_found', {
            resource: t('common:results').toLowerCase(),
          })}
        </div>
      ) : null}
      {!isFiltered && !isFetching
        ? (customComponent ??
          t('common:no_resource_yet', {
            resource: t('common:results').toLowerCase(),
          }))
        : null}
    </div>
  );
}

export function ErrorMessage({ error }: { error: Error }) {
  return (
    <div className="flex size-full flex-col items-center justify-center bg-background text-muted-foreground">
      <div className="my-8 text-center text-sm text-red-500">
        {error.message}
      </div>
    </div>
  );
}

export type DataTableToolbarProps<TData> = {
  table: TableProps<TData>;
  globalValue: string;
  globalOnChange: React.Dispatch<React.SetStateAction<string>>;
};

export function DataTableToolbar<TData>({
  table,
  globalValue,
  globalOnChange,
}: DataTableToolbarProps<TData>) {
  const { t } = useTranslation();

  const isFiltered = table.getState().globalFilter?.length > 0;

  return (
    <div className="mb-2 flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          className="h-8 w-[150px] lg:w-[250px]"
          placeholder="Search..."
          value={globalValue}
          onChange={(value) => globalOnChange(value.target.value)}
        />
        {isFiltered ? (
          <Button
            className="h-8 px-2 lg:px-3"
            variant="ghost"
            onClick={() => {
              table.resetColumnFilters();
              globalOnChange('');
            }}
          >
            {t('common:reset')}
            <Icons.X className="ml-2 size-4" />
          </Button>
        ) : null}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}

export type DataTableViewOptionsProps<TData> = {
  table: TableProps<TData>;
};

export function DataTableViewOptions<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  const { t } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="ml-auto hidden h-8 lg:flex"
          size="sm"
          variant="outline"
        >
          <Icons.SlidersHorizontal className="mr-2 size-4" />
          {t('common:view')}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        <DropdownMenuLabel>{t('common:toggle_columns')}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter(
            (column) => column.accessorFn !== undefined && column.getCanHide(),
          )
          .map((column) => (
            <DropdownMenuCheckboxItem
              key={column.id}
              checked={column.getIsVisible()}
              className="capitalize"
              onCheckedChange={(value) => column.toggleVisibility(!!value)}
            >
              {column.id}
            </DropdownMenuCheckboxItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export type DataTableColumnHeaderProps<TData, TValue> = {
  column: Column<TData, TValue>;
  title: string;
} & React.HTMLAttributes<HTMLDivElement>;

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const { t } = useTranslation();

  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="-ml-3 h-8 data-[state=open]:bg-accent"
            size="sm"
            variant="ghost"
          >
            <span>{title}</span>
            {column.getIsSorted() === 'desc' ? (
              <Icons.ArrowDown className="ml-2 size-4" />
            ) : column.getIsSorted() === 'asc' ? (
              <Icons.ArrowUp className="ml-2 size-4" />
            ) : (
              <Icons.ChevronsUpDown className="ml-2 size-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <Icons.ArrowUp className="mr-2 size-3.5 text-muted-foreground/70" />
            {t('common:sort_asc')}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <Icons.ArrowDown className="mr-2 size-3.5 text-muted-foreground/70" />
            {t('common:sort_desc')}
          </DropdownMenuItem>
          {column.getCanHide() ? (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
                <Icons.EyeOff className="mr-2 size-3.5 text-muted-foreground/70" />
                {t('common:hide')}
              </DropdownMenuItem>
            </>
          ) : null}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export type DataTableRowActionsProps = {
  children: React.ReactNode;
};

export function DataTableRowActions({ children }: DataTableRowActionsProps) {
  const { t } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="flex size-8 p-0 data-[state=open]:bg-muted"
          variant="ghost"
        >
          <Icons.Ellipsis className="size-4" />
          <span className="sr-only">{t('common:open_menu')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export type DataTablePaginationProps<TData> = {
  table: TableProps<TData>;
};

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex-1 text-sm text-muted-foreground">
        {t('common:filtered_selected_rows', {
          selected: table.getFilteredSelectedRowModel().rows.length,
          total: table.getFilteredRowModel().rows.length,
        })}
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">{t('common:rows_per_page')}</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {table.getState().pagination.pageIndex + 1} of{' '}
          {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            className="hidden size-8 p-0 lg:flex"
            disabled={!table.getCanPreviousPage()}
            variant="outline"
            onClick={() => table.setPageIndex(0)}
          >
            <span className="sr-only">{t('common:go_to_first_page')}</span>
            <Icons.ChevronsLeft className="size-4" />
          </Button>
          <Button
            className="size-8 p-0"
            disabled={!table.getCanPreviousPage()}
            variant="outline"
            onClick={() => table.previousPage()}
          >
            <span className="sr-only">{t('common:go_to_previous_page')}</span>
            <Icons.ChevronLeft className="size-4" />
          </Button>
          <Button
            className="size-8 p-0"
            disabled={!table.getCanNextPage()}
            variant="outline"
            onClick={() => table.nextPage()}
          >
            <span className="sr-only">{t('common:go_to_next_page')}</span>
            <Icons.ChevronRight className="size-4" />
          </Button>
          <Button
            className="hidden size-8 p-0 lg:flex"
            disabled={!table.getCanNextPage()}
            variant="outline"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          >
            <span className="sr-only">{t('common:go_to_last_page')}</span>
            <Icons.ChevronsRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
