import { useIsRTL, useSyncRef } from '@ui5/webcomponents-react-base';
import clsx from 'clsx';
import React, { forwardRef, ReactElement, RefObject } from 'react';
import { createUseStyles } from 'react-jss';
import { BusyIndicatorSize } from '../../enums/BusyIndicatorSize';
import { CommonProps } from '../../interfaces/CommonProps';
import { BusyIndicator } from '../../webComponents/BusyIndicator';
import { Label } from '../../webComponents/Label';
import { FlexBox } from '../FlexBox';
import styles from './FilterGroupItem.jss';

const useStyles = createUseStyles(styles, { name: 'FilterGroupItem' });

const emptyObject = {};

export interface FilterGroupItemPropTypes extends CommonProps {
  /**
   * Content of the `FilterGroupItem`.<br />
   * __Note:__ Although this prop accepts all HTML Elements, it is strongly recommended that you only use form elements like `Input`, `Select` or `Switch` in order to preserve the intended design.
   */
  children: ReactElement;
  /**
   * Defines the label of the `FilterGroupItem`.<br />
   * __Note:__ This label is used for the search in the filter configuration dialog.
   */
  label?: string;
  /**
   * Defines the group name of the filter.<br />
   * __Note:__ If no `groupName` is set, the name defaults to "Basic".
   */
  groupName?: string;
  /**
   * Defines the tooltip of the label.<br />
   * __Note:__ If no `labelTooltip` is set, it uses the `label` text as tooltip.
   */
  labelTooltip?: string;
  /**
   * Defines whether a loading indicator should be shown in the `FilterGroupItem`.
   */
  loading?: boolean;
  /**
   * Defines whether the filter is required.<br />
   * __Note:__ Required filters cannot be removed from the `FilterBar`.
   */
  required?: boolean;
  /**
   * Defines whether the filter is visible.
   */
  visible?: boolean;
  /**
   * Defines whether the filter is visible in the `FilterBar` or only in the filter configuration dialog.
   */
  visibleInFilterBar?: boolean;
  /**
   * Defines whether the `groupName` of the `FilterGroupItems` is displayed in the filter configuration dialog.
   */
  considerGroupName?: boolean;
}

/**
 * Represents a filter belonging to the `FilterBar`.
 */
export const FilterGroupItem = forwardRef((props: FilterGroupItemPropTypes, ref: RefObject<HTMLDivElement>) => {
  const classes = useStyles();
  const {
    groupName,
    considerGroupName,
    label,
    labelTooltip,
    required,
    visible,
    visibleInFilterBar,
    children,
    style,
    loading,
    className,
    slot,
    ...rest
  } = props;

  const inFB = props['data-in-fb'];
  const [componentRef, filterGroupItemRef] = useSyncRef<HTMLDivElement>(ref);

  const isRtl = useIsRTL(filterGroupItemRef);
  const transformMarginRight = isRtl ? 'marginLeft' : 'marginRight';

  const styleClasses = clsx(className, inFB ? classes.filterItem : classes.filterItemDialog);

  const inlineStyle = { [transformMarginRight]: '1rem', ...style };

  if (!required && (!visible || (inFB && !visibleInFilterBar))) return null;
  return (
    <div ref={componentRef} slot={slot} {...rest} className={styleClasses} style={inFB ? inlineStyle : emptyObject}>
      <div className={inFB ? classes.innerFilterItemContainer : classes.innerFilterItemContainerDialog}>
        <FlexBox>
          <Label title={labelTooltip ?? label} required={required}>
            {`${considerGroupName && groupName !== 'default' ? `${groupName}: ` : ''}
          ${label}`}
          </Label>
        </FlexBox>
        {loading ? (
          <BusyIndicator className={classes.loadingContainer} active size={BusyIndicatorSize.Small} />
        ) : (
          children
        )}
      </div>
    </div>
  );
});

FilterGroupItem.displayName = 'FilterGroupItem';

FilterGroupItem.defaultProps = {
  groupName: 'default',
  visible: true,
  required: false,
  label: ''
};
