import { enrichEventWithDetails } from '@ui5/webcomponents-react-base/dist/Utils';
import { TableSelectionBehavior } from '@ui5/webcomponents-react/dist/TableSelectionBehavior';
import { TableSelectionMode } from '@ui5/webcomponents-react/dist/TableSelectionMode';

const tagNamesWhichShouldNotSelectARow = new Set([
  'UI5-INPUT',
  'UI5-LINK',
  'UI5-BUTTON',
  'UI5-CHECKBOX',
  'UI5-COMBOBOX',
  'UI5-MULTI-COMBOBOX',
  'UI5-SELECT',
  'UI5-RADIOBUTTON',
  'UI5-SEGMENTEDBUTTON',
  'UI5-SWITCH',
  'UI5-TOGGLEBUTTON',
  'UI5-DATE-PICKER',
  'UI5-DATERANGE-PICKER',
  'UI5-DATETIME-PICKER',
  'UI5-DURATION-PICKER',
  'UI5-TIME-PICKER',
  'UI5-FILE-UPLOADER'
]);

const getRowProps = (rowProps, { row, instance }) => {
  const { webComponentsReactProperties, toggleRowSelected, selectedFlatRows, flatRows } = instance;
  const handleRowSelect = (e, selectionCellClick = false) => {
    if (
      e.target?.dataset?.name !== 'internal_selection_column' &&
      !(e.markerAllowTableRowSelection === true || e.nativeEvent?.markerAllowTableRowSelection === true) &&
      tagNamesWhichShouldNotSelectARow.has(e.target.tagName)
    ) {
      return;
    }

    // dont select empty rows
    const isEmptyRow = row.original?.emptyRow;
    if (isEmptyRow) {
      return;
    }

    // dont select grouped rows
    if (row.isGrouped) {
      return;
    }

    const { selectionBehavior, selectionMode, onRowSelected, onRowClick } = webComponentsReactProperties;

    if (typeof onRowClick === 'function' && e.target?.dataset?.name !== 'internal_selection_column') {
      onRowClick(enrichEventWithDetails(e, { row }));
    }

    if (webComponentsReactProperties.selectionMode === TableSelectionMode.NONE) {
      return;
    }

    // dont continue if the row was clicked and selection mode is row selector only
    if (selectionBehavior === TableSelectionBehavior.ROW_SELECTOR && !selectionCellClick) {
      return;
    }

    if (selectionMode === TableSelectionMode.SINGLE_SELECT) {
      for (const selectedRow of selectedFlatRows) {
        if (selectedRow.id !== row.id) {
          toggleRowSelected(selectedRow.id, false);
        }
      }
    }
    instance.toggleRowSelected(row.id);

    // fire event
    if (typeof onRowSelected === 'function') {
      const payload = {
        row,
        isSelected: !row.isSelected,
        selectedFlatRows: !row.isSelected ? [row.id] : [],
        allRowsSelected: false
      };
      if (selectionMode === TableSelectionMode.MULTI_SELECT) {
        const isRowSelected = selectionCellClick ? row.isSelected : !row.isSelected;
        if (selectionCellClick) {
          payload.isSelected = row.isSelected;
        }
        payload.selectedFlatRows = isRowSelected
          ? [...selectedFlatRows, row]
          : selectedFlatRows.filter((prevRow) => prevRow.id !== row.id);

        if (payload.selectedFlatRows.length === flatRows.length) {
          payload.allRowsSelected = true;
        }
      }
      onRowSelected(enrichEventWithDetails(e, payload));
    }
  };

  return [
    rowProps,
    {
      onKeyDown: (e, selectionCellClick = false) => {
        if (e.key === 'Enter' || e.code === 'Space') {
          if (!tagNamesWhichShouldNotSelectARow.has(e.target.tagName)) {
            e.preventDefault();
          }
          handleRowSelect(e, selectionCellClick);
        }
      },
      onClick: handleRowSelect
    }
  ];
};

export const useSingleRowStateSelection = (hooks) => {
  hooks.getRowProps.push(getRowProps);
};
useSingleRowStateSelection.pluginName = 'useSingleRowStateSelection';
