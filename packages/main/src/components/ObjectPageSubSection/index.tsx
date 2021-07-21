import { ThemingParameters } from '@ui5/webcomponents-react-base/lib/ThemingParameters';
import { StyleClassHelper } from '@ui5/webcomponents-react-base/lib/StyleClassHelper';
import { useConsolidatedRef } from '@ui5/webcomponents-react-base/lib/useConsolidatedRef';
import { usePassThroughHtmlProps } from '@ui5/webcomponents-react-base/lib/usePassThroughHtmlProps';
import React, { FC, forwardRef, ReactNode, ReactNodeArray, RefObject } from 'react';
import { createUseStyles } from 'react-jss';
import { CommonProps } from '../../interfaces/CommonProps';
import { EmptyIdPropException } from '../ObjectPage/EmptyIdPropException';

export interface ObjectPageSubSectionPropTypes extends CommonProps {
  /**
   * Defines the heading of the `ObjectPageSubSection`.
   */
  heading?: string;
  /**
   * Defines the ID of the `ObjectPageSubSection`.
   */
  id: string;
  /**
   * Defines the content of the `ObjectPageSubSection`.
   */
  children: ReactNode | ReactNodeArray;
}

const styles = {
  objectPageSubSection: {
    '&:focus': {
      outline: `1px dotted ${ThemingParameters.sapContent_FocusColor}`,
      outlineOffset: '-1px'
    }
  },
  objectPageSubSectionHeaderTitle: {
    fontSize: ThemingParameters.sapFontHeader5Size,
    color: ThemingParameters.sapGroup_TitleTextColor,
    marginBottom: '0.5rem'
  },
  subSectionContent: {
    padding: '1rem 0 3rem 0'
  }
};

const useStyles = createUseStyles(styles, { name: 'ObjectPageSubSection' });
/**
 * Second-level information container of an `ObjectPage`.<br />
 * __Note:__ This component should only be used inside an `ObjectPageSection` component.
 */
const ObjectPageSubSection: FC<ObjectPageSubSectionPropTypes> = forwardRef(
  (props: ObjectPageSubSectionPropTypes, ref: RefObject<any>) => {
    const { children, id, heading, className, style, tooltip } = props;

    if (!id) {
      throw new EmptyIdPropException('ObjectPageSubSection requires a unique ID property!');
    }

    const htmlRef: RefObject<HTMLDivElement> = useConsolidatedRef(ref);
    const htmlId = `ObjectPageSubSection-${id}`;

    const classes = useStyles();
    const subSectionClassName = StyleClassHelper.of(classes.objectPageSubSection);
    if (className) {
      subSectionClassName.put(className);
    }

    const passThroughProps = usePassThroughHtmlProps(props, ['id']);

    return (
      <div
        ref={htmlRef}
        role="region"
        style={style}
        title={tooltip}
        tabIndex={-1}
        {...passThroughProps}
        className={subSectionClassName.toString()}
        id={htmlId}
      >
        <div
          role="heading"
          aria-level={4}
          className={classes.objectPageSubSectionHeaderTitle}
          data-component-name="ObjectPageSubSectionHeading"
        >
          {heading}
        </div>
        <div className={classes.subSectionContent} data-component-name="ObjectPageSubSectionContent">
          {children}
        </div>
      </div>
    );
  }
);

ObjectPageSubSection.defaultProps = {
  // @ts-ignore
  isSubSection: true
};

ObjectPageSubSection.displayName = 'ObjectPageSubSection';

export { ObjectPageSubSection };
